from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# Usuário (Cliente ou Restaurante) - Task 7 
class Usuario(AbstractUser):
    TIPOS = (
        ('cliente', 'Cliente'),
        ('restaurante', 'Restaurante'),
    )
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=TIPOS)

    REQUIRED_FIELDS = ['email', 'nome', 'tipo']

    def __str__(self):
        return self.nome
    

# Produto - Task 9
class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.FloatField()
    descricao = models.TextField(blank=True)
    foto = models.URLField(blank=True)
    restaurante = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="produtos")

    def __str__(self):
        return self.nome