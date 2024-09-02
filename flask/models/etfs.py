from extensions import db

class Etfs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    exchange = db.Column(db.String(80), nullable=False)
    exchangeShort = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=True)
    
    def __repr__(self):
        return f'<Etf {self.name}>'