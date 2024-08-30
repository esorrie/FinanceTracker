from extensions import db

class Losers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    ticker = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=True)
    change = db.Column(db.Float, nullable=True)
    changePercentage = db.Column(db.Float, nullable=True)
    
    def __repr__(self):
        return f'<Loser {self.name}>'