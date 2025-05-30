from flask import Blueprint, jsonify, current_app
from models.indices import Indices
from models.gainer import Gainers
from models.loser import Losers
from models.etfs import Etfs

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
        
        gainers = Gainers.query.limit(3).all()
        
        dashGainers = [{
            # 'name': gainer.name,
            'ticker': gainer.ticker,
            'price': gainer.price,
            'change': gainer.change,
            'changePercentage': gainer.changePercentage,
        } for gainer in gainers ]
        
        losers = Losers.query.limit(3).all()
        
        dashLosers = [{
            # 'name': loser.name,
            'ticker': loser.ticker,
            'price': loser.price,
            'change': loser.change,
            'changePercentage': loser.changePercentage,
        } for loser in losers ]
        
        dashEtfTickers = ['VUAG.L', 'IITU.L', 'VUKG.L', 'R2SC.L']
        
        etfs = Etfs.query.filter(Etfs.ticker.in_(dashEtfTickers)).all()
        
        dashEtfs = [{
            'name': etf.name,
            'ticker': etf.ticker,
            'price': etf.price,
            'exchange': etf.exchange,
            'exchangeShort': etf.exchangeShort,
        } for etf in etfs]
        
        return jsonify({
            'indices': dashIndices,
            'gainers': dashGainers,
            'losers': dashLosers,
            'etfs': dashEtfs,
            })
        
    except Exception as e:
        current_app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500