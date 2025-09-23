from flask import Blueprint, request, jsonify
from .models import db, Usuario, Produto, Pedido, ItemPedido, AvaliacaoPedido, AvaliacaoRestaurante
from .schemas import UsuarioSchema, ProdutoSchema, PedidoSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash

bp = Blueprint('api', __name__)

# Schemas
usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

produto_schema = ProdutoSchema()
produtos_schema = ProdutoSchema(many=True)

pedido_schema = PedidoSchema()
pedidos_schema = PedidoSchema(many=True)


# Auth
@bp.route("/users/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "JSON inválido"}), 400

    # checa se email já existe
    if Usuario.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email já cadastrado"}), 400

    novo_usuario = Usuario(
        nome=data["nome"],
        email=data["email"],
        senha_hash=generate_password_hash(data["senha"]),
        tipo=data["tipo"]
    )
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({"msg": "Usuário criado", "id": novo_usuario.id}), 201


@bp.route('/token', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(email=data['email']).first()

    if not user or not user.check_senha(data['senha']):
        return jsonify({'msg': 'Email ou senha inválidos'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({'access_token': token}), 200


# Restaurantes 
@bp.route('/restaurants', methods=['GET'])
def list_restaurants():
    restaurantes = Usuario.query.filter_by(tipo='restaurante').all()
    return jsonify(usuarios_schema.dump(restaurantes))


# Criar produto (apenas para restaurantes)
@bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    user_id = int(get_jwt_identity())
    restaurante = Usuario.query.get(user_id)

    if not restaurante or restaurante.tipo != 'restaurante':
        return jsonify({'msg': 'Acesso negado, apenas restaurantes podem criar produtos'}), 403

    data = request.json
    nome = data.get('nome')
    descricao = data.get('descricao', '')
    preco = data.get('preco')

    if not nome or preco is None:
        return jsonify({'msg': 'Nome e preço são obrigatórios'}), 400

    novo_produto = Produto(
        nome=nome,
        descricao=descricao,
        preco=preco,
        restaurante_id=restaurante.id
    )
    db.session.add(novo_produto)
    db.session.commit()

    return produto_schema.jsonify(novo_produto), 201


# Produtos por restaurante
@bp.route('/restaurants/<int:rest_id>/products', methods=['GET'])
def list_products(rest_id):
    produtos = Produto.query.filter_by(restaurante_id=rest_id).all()
    return jsonify(produtos_schema.dump(produtos))


@bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    cliente_id = int(get_jwt_identity())
    cliente = Usuario.query.get(cliente_id)

    if not cliente or cliente.tipo != 'cliente':
        return jsonify({'msg': 'Apenas clientes podem criar pedidos'}), 403

    data = request.json
    endereco = data.get('endereco')
    itens = data.get('itens', [])

    if not endereco or not itens:
        return jsonify({'msg': 'Endereco e itens obrigatórios'}), 400

    pedido = Pedido(cliente_id=cliente_id, endereco=endereco, valor_total=0)
    db.session.add(pedido)
    db.session.commit()

    total = 0
    for item in itens:
        produto = Produto.query.get(item['produto_id'])
        if not produto:
            return jsonify({'msg': f'Produto {item["produto_id"]} não encontrado'}), 404
        quantidade = item.get('quantidade', 1)
        ip = ItemPedido(pedido_id=pedido.id, produto_id=produto.id, quantidade=quantidade)
        db.session.add(ip)
        total += produto.preco * quantidade

    pedido.valor_total = total
    db.session.commit()

    return jsonify(pedido_schema.dump(pedido))

# Listar pedidos do restaurante
@bp.route('/restaurant/orders', methods=['GET'])
@jwt_required()
def restaurant_orders():
    user_id = int(get_jwt_identity())
    restaurante = Usuario.query.get(user_id)
    if not restaurante or restaurante.tipo != 'restaurante':
        return jsonify({'msg': 'Acesso negado'}), 403

    pedidos = Pedido.query.join(ItemPedido).join(Produto).filter(Produto.restaurante_id == restaurante.id).all()
    return jsonify(pedidos_schema.dump(pedidos))


# Atualizar status do pedido
@bp.route('/orders/<int:pedido_id>', methods=['PATCH'])
@jwt_required()
def update_order_status(pedido_id):
    user_id = int(get_jwt_identity())
    restaurante = Usuario.query.get(user_id)
    if not restaurante or restaurante.tipo != 'restaurante':
        return jsonify({'msg': 'Acesso negado'}), 403

    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'msg': 'Pedido não encontrado'}), 404

    # Verifica se algum item do pedido é do restaurante
    if not any(ip.produto.restaurante_id == restaurante.id for ip in pedido.itens):
        return jsonify({'msg': 'Não autorizado'}), 403

    status_novo = request.json.get('status')
    if not status_novo:
        return jsonify({'msg': 'Status obrigatório'}), 400

    pedido.status = status_novo
    db.session.commit()
    return jsonify(pedido_schema.dump(pedido))


@bp.route('/search', methods=['GET'])
def search():
    termo = request.args.get('q', '').strip()
    restaurantes = Usuario.query.filter(Usuario.tipo == 'restaurante', Usuario.nome.ilike(f'%{termo}%')).all()
    produtos = Produto.query.filter(Produto.nome.ilike(f'%{termo}%')).all()

    return jsonify({
        'restaurantes': usuarios_schema.dump(restaurantes),
        'produtos': produtos_schema.dump(produtos)
    })


# Avaliar pedido
@bp.route('/orders/<int:pedido_id>/review', methods=['POST'])
@jwt_required()
def review_order(pedido_id):
    cliente_id = int(get_jwt_identity())
    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'msg': 'Pedido não encontrado'}), 404

    if pedido.cliente_id != cliente_id:
        return jsonify({'msg': 'Não pode avaliar pedido de outro cliente'}), 403

    data = request.json
    nota = data.get('nota')
    comentario = data.get('comentario', '')

    avaliacao = AvaliacaoPedido(pedido_id=pedido.id, cliente_id=cliente_id, nota=nota, comentario=comentario)
    db.session.add(avaliacao)
    db.session.commit()
    return jsonify({'msg': 'Avaliação registrada', 'avaliacao_id': avaliacao.id})


# Avaliar restaurante
@bp.route('/restaurants/<int:rest_id>/review', methods=['POST'])
@jwt_required()
def review_restaurant(rest_id):
    cliente_id = int(get_jwt_identity())
    restaurante = Usuario.query.get(rest_id)
    if not restaurante or restaurante.tipo != 'restaurante':
        return jsonify({'msg': 'Usuário não é restaurante'}), 400

    data = request.json
    nota = data.get('nota')
    comentario = data.get('comentario', '')

    avaliacao = AvaliacaoRestaurante(
        restaurante_id=restaurante.id,
        cliente_id=cliente_id,
        nota=nota,
        comentario=comentario
    )
    db.session.add(avaliacao)
    db.session.commit()
    return jsonify({'msg': 'Avaliação registrada', 'avaliacao_id': avaliacao.id})
