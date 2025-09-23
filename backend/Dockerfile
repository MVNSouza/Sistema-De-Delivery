# Dockerfile

# Use a imagem base oficial do Python
FROM python:3.10-slim

# Define o diretório de trabalho no container
WORKDIR /app

# Instala as dependências (certifique-se de que o requirements.txt esteja atualizado)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código do projeto para o container
COPY . .

# Expõe a porta que o Django usará
EXPOSE 8000