from flask import Flask, jsonify
from flask_cors import CORS
import logging
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

logging.basicConfig(level=logging.DEBUG)

# Defining db Models (tables)
class Stocks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Integer, unique=True, nullable=False)
    Market_Cap= db.Column(db.Integer, unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Stock {self.name}>'
    
class Indices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.String(10), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Index {self.name}>'

class Currencies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.String(10), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Currency {self.name}>'

with app.app_context():
    db.create_all()
    
@app.route('/dashboard')
def dashboard():
    try:
        data = {"message": "This is the dashboard"}
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/discover')
def discover():
    discover = {"message": "This is the Search Page"}
    return jsonify(discover)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)