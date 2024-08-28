from extensions import db

class Stocks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float,  nullable=False)
    Market_Cap = db.Column(db.BigInteger,  nullable=False)
    prev_close = db.Column(db.Float,  nullable=False)
    open = db.Column(db.Float,  nullable=False)
    bid = db.Column(db.Float,  nullable=False)
    ask = db.Column(db.Float,  nullable=False)
    day_range = db.Column(db.Float,  nullable=False)
    year_range = db.Column(db.Float,  nullable=False)
    volume = db.Column(db.BigInteger, nullable=False)
    avg_volume = db.Column(db.BigInteger,  nullable=False)
    beta = db.Column(db.Float,  nullable=False)
    PE_ratio = db.Column(db.Float,  nullable=False)
    EPS = db.Column(db.Float,  nullable=False)
    earnings_date = db.Column(db.Date,  nullable=False)
    dividend_yield = db.Column(db.Float,  nullable=False)
    dividend_date = db.Column(db.Date,  nullable=False)
    year_est = db.Column(db.Float,  nullable=False)
    
    def __repr__(self):
        return f'<Stock {self.name}>'