from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class GNCScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "GNC Pro Performance 100% Whey",
                "price": 4600.0,
                "store_name": "Gnc",
                "product_url": "/gnc-pro-performance-100-whey-protein",
                "image_url": "https://placehold.co/400x400/png?text=GNC+Pro+Performance+100%+Whey"
            },
            {
                "title": "GNC AMP Pure Isolate",
                "price": 5800.0,
                "store_name": "Gnc",
                "product_url": "https://www.guards.in/gnc-amp-pure-isolate",
                "image_url": "https://placehold.co/400x400/png?text=GNC+AMP+Pure+Isolate"
            },
            {
                "title": "GNC Creatine Monohydrate",
                "price": 1100.0,
                "store_name": "Gnc",
                "product_url": "/gnc-creatine-monohydrate",
                "image_url": "https://placehold.co/400x400/png?text=GNC+Creatine+Monohydrate"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.guards.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
