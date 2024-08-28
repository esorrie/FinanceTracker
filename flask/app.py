from flask import Flask
from flask_cors import CORS # type: ignore
import logging
import os
from extensions import db, migrate
#Import scheduler
from services.scheduler import init_scheduler, get_index_data

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

    #Import routes
    from routes.dashboard import dashboard_bp
    app.register_blueprint(dashboard_bp)
    
    init_scheduler(app)
    
    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # initial api call
        success, message = get_index_data()
        if success:
            print("Initial API call successful")
        else:
            print(f"Initial API call failed: {message}")
    
    app.run(host='0.0.0.0', port=5002, debug=True)