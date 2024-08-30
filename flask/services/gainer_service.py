import requests
from flask import current_app
from models.gainer import Gainers
from extensions import db

def get_gainers_data():
    url = f'{current_app.config["FMP_API"]}/stock_market/gainers?apikey={current_app.config["FMP_API_KEY"]}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        db.session.begin()
        
        Gainers.query.delete() # deletes current db data
        
        for gainer in data:
            if gainer["name"] is not None: # prevents adding gainer to db where name is null
                new_gainer = Gainers(
                    name = gainer["name"],
                    ticker = gainer["symbol"],
                    price = gainer["price"],
                    change = gainer["change"],
                    changePercentage = gainer["changesPercentage"]
                )
                db.session.add(new_gainer)
            
        db.session.commit()
        return True, f'Gainers data updated. {len(data)} records added.'
    
    except requests.exceptions.RequestException as e:
        db.session.rollback()
        return False, f"API request failed: {str(e)}"
    except Exception as e:
        db.session.rollback()
        return False, f"An error occurred: {str(e)}"