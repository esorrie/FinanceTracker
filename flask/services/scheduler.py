from apscheduler.schedulers.background import BackgroundScheduler # type: ignore
from flask import current_app
from .gainer_service import get_gainers_data
from .indices_service import get_index_data, update_indices_prices


def scheduled_index_update():
    success, message = get_index_data()
    if not success:
        current_app.logger.error(f"Hourly full update failed: {message}")

def scheduled_index_price_update():
    success, message = update_indices_prices()
    if not success:
        current_app.logger.error(f"Minute price update failed: {message}")

def scheduled_gainers_update():
    success, message = get_gainers_data()
    if not success:
        current_app.logger.error(f"Minute price update failed: {message}")



def init_scheduler(app):
    scheduler = BackgroundScheduler()
    
    def run_job(job_func):
        with app.app_context():
            job_func()
            
    scheduler.add_job(
        func=lambda: run_job(scheduled_index_update), 
        trigger="cron", hour='6-22', minute=0
        )
    
    scheduler.add_job(
        func=lambda: run_job(scheduled_index_price_update), 
        trigger="cron", hour='6-22', minute='1-59'
        )
    
    scheduler.add_job(
        func=lambda: run_job(scheduled_gainers_update),
        trigger='cron', hour='6-22', minute='*/5'
        )
    
    scheduler.start()