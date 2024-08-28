from apscheduler.schedulers.background import BackgroundScheduler
from flask import current_app
from models.indices import Indices
import requests
from datetime import datetime
from extensions import db

def get_index_data():
    url = f'{current_app.config["FMP_API"]}/quotes/index?apikey={current_app.config["FMP_API_KEY"]}'
    
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
    
def update_indices_prices():
    url = f'{current_app.config["FMP_API"]}/quotes/index?apikey={current_app.config["FMP_API_KEY"]}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
    
        for index in data:
            existing_index = Indices.query.filter_by(ticker=index['symbol']).first()
            
            if existing_index:
                existing_index.price = index['price'],
                existing_index.changePercentage = index['changesPercentage']
                
        db.session.commit()
        message = f"Indices prices updated {datetime.now()}"
        print(message)
        return True, message
    except Exception as e:
        return False, str(e)


def scheduled_index_update():
    with current_app.app_context():    
        success, message = get_index_data()
        if not success:
            current_app.logger.error(f"Hourly full update failed: {message}")

def scheduled_index_price_update():
    with current_app.app_context():    
        success, message = update_indices_prices()
        if not success:
            current_app.logger.error(f"Minute price update failed: {message}")
            

def init_scheduler(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        func=scheduled_index_update, 
        trigger="cron", hour='6-22', minute=0
        )
    
    scheduler.add_job(
        func=scheduled_index_price_update, 
        trigger="cron", hour='6-22', minute='1-59'
        )
    
    scheduler.start()