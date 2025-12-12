from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class JioMartScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "BigMuscles Nutrition Premium Gold Whey",
                "price": 1500.0,
                "store_name": "Jio Mart",
                "product_url": "/p/groceries/bigmuscles-nutrition-premium-gold-whey",
                "image_url": "https://placehold.co/400x400/png?text=BigMuscles+Nutrition+Premium+Gold+Whey"
            },
            {
                "title": "MuscleBlaze Biozyme",
                "price": 2450.0,
                "store_name": "Jio Mart",
                "product_url": "https://www.jiomart.com/p/groceries/muscleblaze-biozyme",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Biozyme"
            },
            {
                "title": "Endura Mass Weight Gainer",
                "price": 850.0,
                "store_name": "Jio Mart",
                "product_url": "/p/groceries/endura-mass",
                "image_url": "https://placehold.co/400x400/png?text=Endura+Mass+Weight+Gainer"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.jiomart.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
