from flask import Blueprint, jsonify, current_app
from models.indices import Indices

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
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
        current_app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500