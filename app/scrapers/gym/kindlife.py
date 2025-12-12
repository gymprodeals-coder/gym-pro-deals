from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class KindlifeScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Plix Plant Protein",
                "price": 1100.0,
                "store_name": "Kindlife",
                "product_url": "/product/plix-plant-protein",
                "image_url": "https://placehold.co/400x400/png?text=Plix+Plant+Protein"
            },
            {
                "title": "Cosmix What Women Want",
                "price": 950.0,
                "store_name": "Kindlife",
                "product_url": "https://kindlife.in/product/cosmix-www",
                "image_url": "https://placehold.co/400x400/png?text=Cosmix+What+Women+Want"
            },
            {
                "title": "Oziva Protein & Herbs",
                "price": 1400.0,
                "store_name": "Kindlife",
                "product_url": "/product/oziva-protein",
                "image_url": "https://placehold.co/400x400/png?text=Oziva+Protein+&+Herbs"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://kindlife.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
