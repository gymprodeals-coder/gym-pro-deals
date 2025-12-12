from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class AmazonScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Optimum Nutrition (ON) Gold Standard 100% Whey",
                "price": 3050.0,
                "store_name": "Amazon",
                "product_url": "/Optimum-Nutrition-Standard-Protein-Isolate/dp/B000QSNYGI",
                "image_url": "https://placehold.co/400x400/png?text=Optimum+Nutrition+(ON)+Gold+Standard+100%+Whey"
            },
            {
                "title": "MuscleBlaze Biozyme Performance Whey",
                "price": 2399.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/MuscleBlaze-Biozyme-Performance-Whey-Blue/dp/B07M6L8L8G",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Biozyme+Performance+Whey"
            },
            {
                "title": "Asitis Nutrition Atom Whey Protein",
                "price": 1750.0,
                "store_name": "Amazon",
                "product_url": "/AS-IT-IS-Nutrition-Atom-Whey-Protein/dp/B07K4S2X59",
                "image_url": "https://placehold.co/400x400/png?text=Asitis+Nutrition+Atom+Whey+Protein"
            },
            {
                "title": "GNC Pro Performance 100% Whey",
                "price": 4200.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/GNC-Amp-Gold-lbs-Double/dp/B0794QDP2Y",
                "image_url": "https://placehold.co/400x400/png?text=GNC+Pro+Performance+100%+Whey"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.amazon.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
