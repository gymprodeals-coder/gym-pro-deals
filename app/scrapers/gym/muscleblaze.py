from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class MuscleBlazeScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Biozyme Performance Whey",
                "price": 2499.0,
                "store_name": "Muscleblaze",
                "product_url": "/sv/muscleblaze-biozyme-performance-whey/SP-88095",
                "image_url": "https://placehold.co/400x400/png?text=Biozyme+Performance+Whey"
            },
            {
                "title": "Fuel One Whey Protein",
                "price": 1799.0,
                "store_name": "Muscleblaze",
                "product_url": "https://www.muscleblaze.com/sv/mb-fuel-one-whey-protein/SP-86367",
                "image_url": "https://placehold.co/400x400/png?text=Fuel+One+Whey+Protein"
            },
            {
                "title": "Creatine Monohydrate",
                "price": 499.0,
                "store_name": "Muscleblaze",
                "product_url": "/sv/muscleblaze-creatine-monohydrate/SP-66632",
                "image_url": "https://placehold.co/400x400/png?text=Creatine+Monohydrate"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.muscleblaze.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
