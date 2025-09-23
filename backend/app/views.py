from django.shortcuts import render

# Create your views here.


from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Usuario, Produto
from .serializers import UsuarioSerializer, ProdutoSerializer

# Task 9
class RestauranteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Usuario.objects.filter(tipo='restaurante')
    serializer_class = UsuarioSerializer

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        restaurante = self.get_object()
        produtos = Produto.objects.filter(restaurante=restaurante)
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)