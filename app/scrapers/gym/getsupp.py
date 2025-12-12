from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class GetSuppScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Atom Whey Protein",
                "price": 1850.0,
                "store_name": "Getsupp",
                "product_url": "/product/atom-whey",
                "image_url": "https://placehold.co/400x400/png?text=Atom+Whey+Protein"
            },
            {
                "title": "Avvatar Whey Protein",
                "price": 2100.0,
                "store_name": "Getsupp",
                "product_url": "https://www.getsupp.com/product/avvatar-whey",
                "image_url": "https://placehold.co/400x400/png?text=Avvatar+Whey+Protein"
            },
            {
                "title": "MuscleBlaze Creatine",
                "price": 550.0,
                "store_name": "Getsupp",
                "product_url": "/product/mb-creatine",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Creatine"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.getsupp.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
