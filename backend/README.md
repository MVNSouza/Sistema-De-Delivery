# Sistema-De-Delivery

## Projeto acadêmico feito com React, Flask e Postgres


A partir da raiz do seu projeto, execute a seguinte sequência de comandos:

Inicie os contêineres: Este comando constrói e inicia o seu projeto e o banco de dados.

Bash
    docker-compose up --build

Abra um novo terminal e rode os comandos de migração (o servidor já está rodando no terminal anterior).

Bash
### Executa a migração para criar as tabelas do Django
    docker-compose exec web python manage.py migrate

### Opcional: Crie um superusuário para acessar o admin
abra um novo terminal e execute este comando: 
    docker-compose exec web python manage.py createsuperuser
Pronto! Seu projeto está rodando em http://localhost:8000/. Você pode acessar o painel de administração em http://localhost:8000/admin/.

### Para Desligar
Para parar todos os serviços (contêineres) definidos no seu docker-compose.yml e remover os contêineres, execute:
Bash
    docker-compose down