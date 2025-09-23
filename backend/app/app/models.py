from . import db
from werkzeug.security import generate_password_hash, check_password_hash


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(512), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'cliente' ou 'restaurante'

    produtos = db.relationship('Produto', backref='restaurante', lazy=True)
    pedidos = db.relationship('Pedido', backref='cliente_obj', lazy=True)

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def check_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)


class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    descricao = db.Column(db.Text)
    foto = db.Column(db.String(255))
    restaurante_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)


class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(20), default='pendente')
    valor_total = db.Column(db.Float, default=0.0)
    cliente_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    endereco = db.Column(db.String(255))
    itens = db.relationship('ItemPedido', backref='pedido', lazy=True)


class ItemPedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'), nullable=False)
    quantidade = db.Column(db.Integer, default=1)
    produto = db.relationship('Produto')


class AvaliacaoPedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)


class AvaliacaoRestaurante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurante_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
