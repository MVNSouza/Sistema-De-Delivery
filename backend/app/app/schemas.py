from . import ma
from .models import Usuario, Produto, Pedido, ItemPedido, AvaliacaoPedido, AvaliacaoRestaurante

class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True
        exclude = ('senha_hash',)


class ProdutoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Produto
        load_instance = True


class ItemPedidoSchema(ma.SQLAlchemyAutoSchema):
    produto = ma.Nested(ProdutoSchema)
    class Meta:
        model = ItemPedido
        load_instance = True


class PedidoSchema(ma.SQLAlchemyAutoSchema):
    itens = ma.Nested(ItemPedidoSchema, many=True)
    class Meta:
        model = Pedido
        load_instance = True


class AvaliacaoPedidoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AvaliacaoPedido
        load_instance = True


class AvaliacaoRestauranteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AvaliacaoRestaurante
        load_instance = True
