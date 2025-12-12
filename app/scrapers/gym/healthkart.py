from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class HealthKartScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "MuscleBlaze Biozyme Performance Whey",
                "price": 2299.0,
                "store_name": "Healthkart",
                "product_url": "/sv/muscleblaze-biozyme-performance-whey/SP-88095",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Biozyme+Performance+Whey"
            },
            {
                "title": "ON Gold Standard 100% Whey Protein",
                "price": 3299.0,
                "store_name": "Healthkart",
                "product_url": "https://www.healthkart.com/sv/on-gold-standard-100-percent-whey-protein/SP-13936",
                "image_url": "https://placehold.co/400x400/png?text=ON+Gold+Standard+100%+Whey+Protein"
            },
            {
                "title": "MB Fuel One Whey Protein",
                "price": 1699.0,
                "store_name": "Healthkart",
                "product_url": "/sv/mb-fuel-one-whey-protein/SP-86367",
                "image_url": "https://placehold.co/400x400/png?text=MB+Fuel+One+Whey+Protein"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.healthkart.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
