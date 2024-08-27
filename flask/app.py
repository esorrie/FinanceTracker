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
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float,  nullable=False)
    Market_Cap = db.Column(db.BigInteger,  nullable=False)
    prev_close = db.Column(db.Float,  nullable=False)
    open = db.Column(db.Float,  nullable=False)
    bid = db.Column(db.Float,  nullable=False)
    ask = db.Column(db.Float,  nullable=False)
    day_range = db.Column(db.Float,  nullable=False)
    year_range = db.Column(db.Float,  nullable=False)
    volume = db.Column(db.BigInteger, nullable=False)
    avg_volume = db.Column(db.BigInteger,  nullable=False)
    beta = db.Column(db.Float,  nullable=False)
    PE_ratio = db.Column(db.Float,  nullable=False)
    EPS = db.Column(db.Float,  nullable=False)
    earnings_date = db.Column(db.Date,  nullable=False)
    dividend_yield = db.Column(db.Float,  nullable=False)
    dividend_date = db.Column(db.Date,  nullable=False)
    year_est = db.Column(db.Float,  nullable=False)
    
    def __repr__(self):
        return f'<Stock {self.name}>'
    
class Indices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=True)
    open = db.Column(db.Float, nullable=True)
    prev_close = db.Column(db.Float, nullable=True)
    dayRange = db.Column(db.Float, nullable=True)
    yearLow = db.Column(db.Float, nullable=True)
    yearHigh = db.Column(db.Float, nullable=True)
    volume = db.Column(db.BigInteger, nullable=True)
    changePercentage = db.Column(db.Float, nullable=True)
    
    def __repr__(self):
        return f'<Index {self.name}>'

class Currencies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(10), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    prev_close = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    bid = db.Column(db.Float, nullable=False)
    ask = db.Column(db.Float, nullable=False)
    day_range = db.Column(db.Float, nullable=False)
    year_range = db.Column(db.Float, nullable=False)
    
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