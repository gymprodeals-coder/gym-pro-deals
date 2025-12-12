from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class ApolloScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Apollo Life Whey Protein",
                "price": 1200.0,
                "store_name": "Apollo",
                "product_url": "/otc/apollo-life-whey-protein",
                "image_url": "https://placehold.co/400x400/png?text=Apollo+Life+Whey+Protein"
            },
            {
                "title": "Optimum Nutrition Gold Standard",
                "price": 3200.0,
                "store_name": "Apollo",
                "product_url": "https://www.apollopharmacy.in/otc/on-gold-standard",
                "image_url": "https://placehold.co/400x400/png?text=Optimum+Nutrition+Gold+Standard"
            },
            {
                "title": "Ensure Plus",
                "price": 800.0,
                "store_name": "Apollo",
                "product_url": "/otc/ensure-plus",
                "image_url": "https://placehold.co/400x400/png?text=Ensure+Plus"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.apollopharmacy.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
