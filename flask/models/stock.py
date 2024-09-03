from extensions import db

class Stocks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float,  nullable=False)
    changePercentage = db.Column(db.Float,  nullable=False)
    change = db.Column(db.Float,  nullable=False)
    day_low = db.Column(db.Float,  nullable=False)
    day_high = db.Column(db.Float,  nullable=False)
    year_high = db.Column(db.Float,  nullable=False)
    year_low = db.Column(db.Float,  nullable=False)
    Market_Cap = db.Column(db.BigInteger,  nullable=False)
    exchange = db.Column(db.String(10),  nullable=False)
    volume = db.Column(db.BigInteger, nullable=False)
    avg_volume = db.Column(db.BigInteger,  nullable=False)
    open = db.Column(db.Float,  nullable=False)
    prev_close = db.Column(db.Float,  nullable=False)
    EPS = db.Column(db.Float,  nullable=False)
    PE_ratio = db.Column(db.Float,  nullable=False)
    earnings_call = db.Column(db.Date,  nullable=False)
    shares_outstanding = db.Column(db.Float,  nullable=False)
    
    beta = db.Column(db.Float,  nullable=True)
    currency = db.Column(db.Float,  nullable=True)
    sector = db.Column(db.String(40), nullable=True)
    logo = db.Column(db.LargeBinary, nullable=True)
    
    def __repr__(self):
        return f'<Stock {self.name}>'
    
    
    # prev_earn_date = db.Column(db.Date,  nullable=False)
    # actualEarnings = db.Column(db.Float,  nullable=False)
    # estEarnings = db.Column(db.Float,  nullable=False)
    
    
    # dividend = db.Column(db.Date,  nullable=False)
    # dividend_rec_date = db.Column(db.Date,  nullable=False)
    # dividend_pay_date = db.Column(db.Date,  nullable=False)
    # dividend_decl_date = db.Column(db.Date,  nullable=False)