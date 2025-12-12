from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class HyugaLifeScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "MuscleBlaze Biozyme Whey",
                "price": 2699.0,
                "store_name": "Hyugalife",
                "product_url": "/products/muscleblaze-biozyme-whey",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Biozyme+Whey"
            },
            {
                "title": "Avvatar Whey Protein",
                "price": 2150.0,
                "store_name": "Hyugalife",
                "product_url": "https://hyugalife.com/products/avvatar-whey",
                "image_url": "https://placehold.co/400x400/png?text=Avvatar+Whey+Protein"
            },
            {
                "title": "GNC Pro Performance",
                "price": 4299.0,
                "store_name": "Hyugalife",
                "product_url": "/products/gnc-pro-performance",
                "image_url": "https://placehold.co/400x400/png?text=GNC+Pro+Performance"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://hyugalife.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
