from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class FlipkartScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "MuscleBlaze Biozyme Performance Whey",
                "price": 2599.0,
                "store_name": "Flipkart",
                "product_url": "/muscleblaze-biozyme-performance-whey/p/itm...",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Biozyme+Performance+Whey"
            },
            {
                "title": "ON Gold Standard Whey",
                "price": 3100.0,
                "store_name": "Flipkart",
                "product_url": "https://www.flipkart.com/on-gold-standard-whey/p/itm...",
                "image_url": "https://placehold.co/400x400/png?text=ON+Gold+Standard+Whey"
            },
            {
                "title": "Nakpro Platinum Whey",
                "price": 1800.0,
                "store_name": "Flipkart",
                "product_url": "/nakpro-platinum-whey/p/itm...",
                "image_url": "https://placehold.co/400x400/png?text=Nakpro+Platinum+Whey"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.flipkart.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
