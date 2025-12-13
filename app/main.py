from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Strapi Configuration
STRAPI_API_URL = os.getenv("STRAPI_API_URL", "https://tasteful-positivity-a3d6d1c.strapicloud.io/api/deals")

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
        # Fetch deals from Strapi
        # Strapi returns data wrapped in { data: [...] }
        # We need to fetch with ?populate=* to get images if they are relations (though 'fields' might be flat in your case)
        target_url = STRAPI_API_URL
        
        try:
             # Populate=* ensures we get related components/media if the schema uses them
             response = requests.get(target_url, params={"populate": "*"}, timeout=10)
             response.raise_for_status()
             
             strapi_data = response.json()
             raw_deals = strapi_data.get('data', [])
             
             # IMPORTANT: Strapi V4/V5 returns attributes nested inside 'attributes' key. 
             # We must normalize this for the frontend which expects flat objects.
             normalized_deals = []
             for item in raw_deals:
                 # Handle if item has 'attributes' (V4/V5) or is flat
                 attrs = item.get('attributes', item)
                 
                 # Ensure ID is preserved
                 deal_obj = {
                     "id": item.get('id'),
                     **attrs
                 }
                 normalized_deals.append(deal_obj)
                 
             return normalized_deals
             
        except requests.exceptions.RequestException as e:
             print(f"Strapi Connection Error: {e}")
             # If Strapi is empty or unreachable, return empty list or fallback to prevent frontend crash
             return []

    except Exception as e:
        return {"error": str(e), "status": "error"}

@app.get("/api/debug/scrapers")
async def debug_scrapers():
    return {"message": "Deals are fetched from Strapi Cloud: " + STRAPI_API_URL, "status": "info"}
