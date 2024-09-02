import requests
from datetime import datetime
from flask import current_app
from models.etfs import Etfs
from extensions import db

def get_etfs_data():
    url = f'{current_app.config["FMP_API"]}/etf/list?apikey={current_app.config["FMP_API_KEY"]}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        allowed_exchanges = ['NYSE', 'NASDAQ', 'LSE']
        excluded_keyword = 'LEVERAGE'
        
        for etf in data:
            
            if (etf['exchangeShortName'] in allowed_exchanges and
            excluded_keyword.lower() not in etf['name'].lower()):
                
                existing_etf = Etfs.query.filter_by(ticker=etf['symbol']).first()
                
                if existing_etf:
                    existing_etf.price = etf['price']
                    existing_etf.name = etf['name']
                    existing_etf.exchange = etf['exchange']
                    existing_etf.exchangeShort = etf['exchangeShortName']
                    
                else:
                    new_etf = Etfs(
                        name = etf['name'],
                        ticker = etf['symbol'],
                        exchange = etf['exchange'],
                        exchangeShort = etf['exchangeShortName'],
                        price = etf['price']
                    )
                    db.session.add(new_etf)
            
                db.session.commit()
                
        message = f"ETF's data fetched and stored successfully at {datetime.now()}"
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
    