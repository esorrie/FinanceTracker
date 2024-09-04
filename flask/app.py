from flask import Flask
from flask_cors import CORS # type: ignore
import logging
import os
from extensions import db, migrate
#Import scheduler
from services.scheduler import init_scheduler
from services.indices_service import get_index_data
from services.gainer_service import get_gainers_data
from services.loser_service import get_losers_data
from services.etfs_service import get_etfs_data
from services.stocks_service import get_stock_data

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['FMP_API_KEY'] = os.getenv('API_KEY')
    app.config['FMP_API'] = "https://financialmodelingprep.com/api/v3"

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    logging.basicConfig(level=logging.DEBUG)

    # Import db models
    from models.stock import Stocks
    from models.indices import Indices
    from models.currencies import Currencies
    from models.gainer import Gainers
    from models.loser import Losers
    from models.etfs import Etfs

    #Import routes
    from routes.dashboard import dashboard_bp
    from routes.stock import stock_bp
    
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(stock_bp)
    
    init_scheduler(app)
    
    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # initial api call
        success, message = get_index_data()
        success, message = get_gainers_data()
        success, message = get_losers_data()
        success, message = get_etfs_data()
        success, message = get_stock_data()
        
        if success:
            print("Initial API call successful")
        else:
            print(f"Initial API call failed: {message}")
    
    app.run(host='0.0.0.0', port=5002, debug=True)