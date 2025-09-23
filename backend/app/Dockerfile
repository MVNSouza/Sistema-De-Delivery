# # Use imagem Python slim
# FROM python:3.11-slim

# # Diretório de trabalho
# WORKDIR /app

# # Instala dependências do sistema necessárias para psycopg2 e build
# RUN apt-get update && apt-get install -y \
#     gcc \
#     g++ \
#     libpq-dev \
#     build-essential \
#     python3-dev \
#     && rm -rf /var/lib/apt/lists/*

# # Copia requirements.txt e instala dependências Python
# COPY requirements.txt .
# RUN pip install --upgrade pip
# RUN pip install --no-cache-dir -r requirements.txt

# # Copia o restante do projeto
# COPY . .

# # Expõe porta do Flask
# EXPOSE 5000

# # Comando padrão para rodar o Flask
# CMD ["python", "manage.py", "run", "--host=0.0.0.0"]


FROM python:3.11-slim

WORKDIR /app

# Instala dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia requirements.txt e instala libs Python
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copia restante do projeto
COPY . .

# Expõe porta 5000
EXPOSE 5000

# CMD que mantém o Flask rodando
CMD ["python", "manage.py", "run", "--host=0.0.0.0"]
