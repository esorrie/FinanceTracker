import requests
from flask import current_app
from models.loser import Losers
from extensions import db

def get_losers_data():
    url = f'{current_app.config["FMP_API"]}/stock_market/losers?apikey={current_app.config["FMP_API_KEY"]}'

    try: 
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        db.session.begin()
        
        Losers.query.delete() # deletes current db data
        
        for loser in data:
            if loser["name"] is not None: # prevents adding loser to db where name is null
                new_loser = Losers(
                    name = loser["name"],
                    ticker = loser["symbol"],
                    price = loser["price"],
                    change = loser["change"],
                    changePercentage = loser["changesPercentage"]
                )
                db.session.add(new_loser)
            
        db.session.commit()
        return True, f'Losers data updated. {len(data)} records added'
    
    except requests.exceptions.RequestException as e:
        db.session.rollback()
        return False, f"API request failed: {str(e)}"
    except Exception as e:
        db.session.rollback()
        return False, f"An error occurred: {str(e)}"
        