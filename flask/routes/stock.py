from flask import Blueprint, jsonify, current_app, request
from models.stock import Stocks
from sqlalchemy import desc

stock_bp = Blueprint('stocks', __name__)

@stock_bp.route('/stocks', methods=['GET'])
def stocks():
    try:
        page = request.args.get('page', 1, type=int)
        per_page =10
        
        stocks = Stocks.query.order_by(desc(Stocks.Market_Cap)).paginate(page=page, per_page=per_page, error_out=False)
        
        mainStocks = [{
            'name': stock.name,
            'ticker': stock.ticker,
            'price': stock.price,
            'marketCap': stock.Market_Cap,
            'prev_close': stock.prev_close,
            'open': stock.open,
            'volume': stock.volume,
            'avg_volume': stock.avg_volume,
            'beta': stock.beta,
            'pe_ratio': stock.PE_ratio,
            'eps': stock.EPS,
            'currency': stock.currency,
            'dayLow': stock.day_low,
            'dayHigh': stock.day_high,
            'yearLow': stock.year_low,
            'yearHigh': stock.year_high,
            'earningsCall': stock.earnings_call,
            'sharesOutstanding': stock.shares_outstanding,
            'sector': stock.sector,
            'logo': stock.logo,
            'change': stock.change,
            'changePercentage': stock.changePercentage,
            'exchange': stock.exchange,
        } for stock in stocks ]
        
        return jsonify({
            'stocks': mainStocks,
            'total': stocks.total,
            'pages': stocks.pages,
            'current_page': stocks.page
        })
    
    except Exception as e:
        current_app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500