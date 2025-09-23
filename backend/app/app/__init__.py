# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

# Carrega o .env explicitamente (path absoluto)
dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path)

db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configurações do banco e JWT
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'supersecretkey'

    # Inicializa extensões
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)

    # Registra rotas
    from .routes import bp
    app.register_blueprint(bp)

    return app
