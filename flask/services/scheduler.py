from apscheduler.schedulers.background import BackgroundScheduler # type: ignore
from flask import current_app
from .indices_service import get_index_data, update_indices_prices
from .gainer_service import get_gainers_data
from .loser_service import get_losers_data
from .etfs_service import get_etfs_data
from .stocks_service import get_stock_data, update_stocks_price


def scheduled_index_update():
    success, message = get_index_data()
    if not success:
        current_app.logger.error(f"Hourly full update failed: {message}")

def scheduled_index_price_update():
    success, message = update_indices_prices()
    if not success:
        current_app.logger.error(f"Minute price update fro indices failed: {message}")

def scheduled_gainers_update():
    success, message = get_gainers_data()
    if not success:
        current_app.logger.error(f"5 Minute price update for gainers failed: {message}")

def scheduled_losers_update():
    success, message = get_losers_data()
    if not success:
        current_app.logger.error(f"5 Minute price update for losers failed: {message}")

def scheduled_etf_update():
    success, message = get_etfs_data()
    if not success:
        current_app.logger.error(f"Minute price update for Etf's failed: {message}")

def scheduled_stock_update():
    success, message = get_stock_data()
    if not success:
        current_app.logger.error(f"hourly full update for Etf's failed: {message}")

def scheduled_stock_price_update():
    success, message = update_stocks_price()
    if not success:
        current_app.logger.error(f"minute price update for stocks failed: {message}")



def init_scheduler(app):
    scheduler = BackgroundScheduler()
    
    def run_job(job_func):
        with app.app_context():
            job_func()
        
    def run_hour_jobs():
        run_job(scheduled_index_update)
        run_job(scheduled_stock_update)
        
    scheduler.add_job(
        func=run_hour_jobs,
        trigger="cron", hour='6-22', minute=0
        )
    
    def run_min_jobs():
        run_job(scheduled_index_price_update)
        run_job(scheduled_etf_update)
        run_job(scheduled_stock_price_update)
        
    scheduler.add_job(
        func=run_min_jobs,
        trigger="cron", hour='6-22', minute='1-59'
        )
    
    def run_5min_jobs():
        run_job(scheduled_gainers_update)
        run_job(scheduled_losers_update)
        

    scheduler.add_job(
        func=run_5min_jobs,
        trigger='cron', hour='6-22', minute='*/5'
        )    
    
    scheduler.start()