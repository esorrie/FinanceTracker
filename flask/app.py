from flask import Flask, jsonify
from flask_cors import CORS
import logging
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, time
import os
import requests


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

FMP_API_KEY = os.getenv('API_KEY')
FMP_API = "https://financialmodelingprep.com/api/v3"

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

def get_index_data():
    url = f'{FMP_API}/quotes/index?apikey={FMP_API_KEY}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        for index in data:
            existing_index = Indices.query.filter_by(ticker=index['symbol']).first()
            
            if existing_index:
                existing_index.price = index['price'],
                existing_index.open = index['open'],
                existing_index.prev_close = index['previousClose'],
                existing_index.dayRange = index['change'],
                existing_index.yearLow = index['yearLow'],
                existing_index.yearHigh = index['yearHigh'],
                existing_index.volume = index['volume'],
                existing_index.changePercentage = index['changesPercentage']
            else:
                new_index = Indices(
                    name = index['name'],
                    ticker = index['symbol'],
                    price = index['price'],
                    open = index['open'],
                    prev_close = index['previousClose'],
                    dayRange = index['change'],
                    yearLow = index['yearLow'],
                    yearHigh = index['yearHigh'],
                    volume = index['volume'],
                    changePercentage = index['changesPercentage']
                )
                db.session.add(new_index)
        db.session.commit()
        message = f"Indices data fetched and stored successfully at {datetime.now()}"
        print(message)
        return True, message
        
    except requests.exceptions.RequestException as e:
        error_message = f"API request failed: {str(e)}"
        print(error_message)
        return False, error_message
    except Exception as e:
        db.session.rollback()
        error_message = f"An error occurred: {str(e)}"
        print(error_message)
        return False, error_message
    

@app.route('/dashboard')
def dashboard():
    try:
        dashIndicesTickers = ["^GSPC", "^IXIC", "^FTSE", "^RUT"]
        
        indices = Indices.query.filter(Indices.ticker.in_(dashIndicesTickers)).all()
        
        dashIndices = [{
            'name': index.name,
            'ticker': index.ticker,
            'price': index.price,
            'open': index.open,
            'prev_close': index.prev_close,
            'dayRange': index.dayRange,
            'yearRange': f"{index.yearLow} - {index.yearHigh}",
            'volume': index.volume,
            'changePercentage': index.changePercentage,
        } for index in indices ]
        
        return jsonify(dashIndices)
        
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
# @app.route('/discover')
# def discover():
#     discover = {"message": "This is the Search Page"}
#     return jsonify(discover)

def is_valid_hour():
    now = datetime.now().time()
    return time(6, 0) <= now <= time(22, 0)

def scheduled_task():
    if is_valid_hour():
        success, message = get_index_data()

        if not success:
            app.logger.error(f"Scheduled task failed: {message}")
            
scheduler = BackgroundScheduler()
scheduler.add_job(func=scheduled_task, trigger="cron", hour='6-22', minute=0)
scheduler.start()

with app.app_context():
    success, message = get_index_data()
    if success:
        print("Initial API call successful")
    else:
        print(f"Initial API call failed: {message}")
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)