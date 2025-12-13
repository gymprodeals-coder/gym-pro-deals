from fastapi import FastAPI
from app.scrapers.manager import run_category_scrapers, get_loaded_scraper_names
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/deals/gym")
async def get_gym_deals():
    try:
        deals = await run_category_scrapers('gym')
        # Return list directly to match frontend expectation if needed, or stick to current format.
        # Based on index.html: const data = await response.json(); if (!data || data.length ... grid.innerHTML = data.map...)
        # The frontend expects a raw LIST, not {"data": ...} wrapper.
        # I will change this to return the list directly to fix the frontend logic too.
        return deals 
    except Exception as e:
        return {"error": str(e), "status": "error"}

@app.get("/api/debug/scrapers")
async def debug_scrapers():
    try:
        scrapers = get_loaded_scraper_names('gym')
        return {"loaded_scrapers": scrapers, "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "error"}
