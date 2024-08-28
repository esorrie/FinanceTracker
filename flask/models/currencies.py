from extensions import db

class Currencies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(10), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    prev_close = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    bid = db.Column(db.Float, nullable=False)
    ask = db.Column(db.Float, nullable=False)
    day_range = db.Column(db.Float, nullable=False)
    year_range = db.Column(db.Float, nullable=False)
    
    def __repr__(self):
        return f'<Currency {self.name}>'