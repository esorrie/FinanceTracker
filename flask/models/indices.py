from extensions import db

class Indices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=True)
    open = db.Column(db.Float, nullable=True)
    prev_close = db.Column(db.Float, nullable=True)
    dayRange = db.Column(db.Float, nullable=True)
    yearLow = db.Column(db.Float, nullable=True)
    yearHigh = db.Column(db.Float, nullable=True)
    volume = db.Column(db.BigInteger, nullable=True)
    changePercentage = db.Column(db.Float, nullable=True)
    
    def __repr__(self):
        return f'<Index {self.name}>'
