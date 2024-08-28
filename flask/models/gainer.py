from extensions import db

class Gainers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), primary_key=True)
    ticker = db.Column(db.String(80), primary_key=True)
    price = db.Column(db.Float, primary_key=True)
    change = db.Column(db.Float, primary_key=True)
    changePercentage = db.Column(db.Float, primary_key=True)
    
    def __repr__(self):
        return f'<Gainer {self.name}>'