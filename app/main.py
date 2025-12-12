from fastapi import FastAPI
from app.scrapers.manager import run_category_scrapers, get_loaded_scraper_names

app = FastAPI()

@app.get("/api/deals/gym")
async def get_gym_deals():
    try:
        deals = await run_category_scrapers('gym')
        return {"data": deals, "count": len(deals), "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "error"}

@app.get("/api/debug/scrapers")
async def debug_scrapers():
    try:
        scrapers = get_loaded_scraper_names('gym')
        return {"loaded_scrapers": scrapers, "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "error"}
