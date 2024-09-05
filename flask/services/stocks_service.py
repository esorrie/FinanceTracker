import requests
from datetime import datetime
from flask import current_app
from models.stock import Stocks
from extensions import db

def get_stock_data():
    
    exchanges = ['NASDAQ', 'NYSE', 'LSE']
    all_stocks = []
    
    total_stocks_processed = 0
    skipped_stocks = 0
    
    for exchange in exchanges:
        url = f'{current_app.config["FMP_API"]}/symbol/{exchange}?apikey={current_app.config["FMP_API_KEY"]}'
        
        try: 
            response = requests.get(url)
            response.raise_for_status()
            exchange_data = response.json()
            all_stocks.extend(exchange_data)
            
            for stock in all_stocks:
                
                if any(stock.get(field) is None or stock.get(field) == 0 for field in [
                    'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh',
                    'yearHigh', 'yearLow', 'marketCap', 'exchange', 'volume',
                    'avgVolume', 'open', 'previousClose', 'eps', 'pe',
                    'earningsAnnouncement', 'sharesOutstanding', 'symbol', 'name'
                ]):
                    skipped_stocks += 1
                    continue
                
                stock_data = {
                    'price': stock['price'],
                    'changePercentage': stock['changesPercentage'],
                    'change': stock['change'],
                    'day_low': stock['dayLow'],
                    'day_high': stock['dayHigh'],
                    'year_high': stock['yearHigh'],
                    'year_low': stock['yearLow'],
                    'Market_Cap': stock['marketCap'],
                    'exchange': stock['exchange'],
                    'volume': stock['volume'],
                    'avg_volume': stock['avgVolume'],
                    'open': stock['open'],
                    'prev_close': stock['previousClose'],
                    'EPS': stock['eps'],
                    'PE_ratio': stock['pe'],
                    'earnings_call': stock['earningsAnnouncement'],
                    'shares_outstanding': stock['sharesOutstanding']
                }
                
                existing_stock = Stocks.query.filter_by(ticker=stock['symbol']).first()
                
                if existing_stock:
                    for key, value in stock_data.items():
                        setattr(existing_stock, key, value)
                else:
                    stock_data['name'] = stock['name']
                    stock_data['ticker'] = stock['symbol']
                    new_stock = Stocks(**stock_data)
                    db.session.add(new_stock)
                    
                    total_stocks_processed += 1
                
                if total_stocks_processed % 100 == 0:
                    db.session.commit()
                    
                
        except requests.exceptions.RequestException as e:
            error_message = f"API request failed: {str(e)}"
            print(error_message)
            return False, error_message
        except Exception as e:
            db.session.rollback()
            error_message = f"An error occurred: {str(e)}"
            print(error_message)
            return False, error_message
        
    db.session.commit()
    message = f"Stock data fetched and stored successfully. Total processed: {total_stocks_processed}, Skipped: {skipped_stocks} at {datetime.now()}"
    print(message)
    return True, message
        
        
def update_stocks_price():
    exchanges = ['NASDAQ', 'NYSE', 'LSE']
    all_stocks = []
    
    total_stocks_processed = 0
    skipped_stocks = 0
    
    for exchange in exchanges:
        url = f'{current_app.config["FMP_API"]}/symbol/{exchange}?apikey={current_app.config["FMP_API_KEY"]}'
        
        try: 
            response = requests.get(url)
            response.raise_for_status()
            exchange_data = response.json()
            all_stocks.extend(exchange_data)
            
            for stock in all_stocks:
                
                if any(stock.get(field) is None or stock.get(field) == 0 for field in [
                    'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh',
                    'yearHigh', 'yearLow', 'marketCap', 'exchange', 'volume',
                    'avgVolume', 'open', 'previousClose', 'eps', 'pe',
                    'earningsAnnouncement', 'sharesOutstanding', 'symbol', 'name'
                ]):
                    skipped_stocks += 1
                    continue
                
                stock_data = {
                    'price': stock['price']
                }
                
                existing_stock = Stocks.query.filter_by(ticker=stock['symbol']).first()
                
                if existing_stock:
                    for key, value in stock_data.items():
                        setattr(existing_stock, key, value)
                        
        except Exception as e:
            return False, str(e)
        
    db.session.commit()
    message = f"Stock price updated and stored successfully. Total processed: {total_stocks_processed}, Skipped: {skipped_stocks} at {datetime.now()}"
    print(message)
    return True, message