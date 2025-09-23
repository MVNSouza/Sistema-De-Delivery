from app import create_app, db
from flask.cli import FlaskGroup

app = create_app()
cli = FlaskGroup(app)

@cli.command("create_db")
def create_db():
    """Cria todas as tabelas no banco de dados"""
    db.create_all()
    print("Banco de dados criado com sucesso!")

if __name__ == "__main__":
    cli()
