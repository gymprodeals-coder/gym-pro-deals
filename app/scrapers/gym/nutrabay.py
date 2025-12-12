from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class NutrabayScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Nutrabay Gold 100% Whey Protein Concentrate",
                "price": 1600.0,
                "store_name": "Nutrabay",
                "product_url": "/product/nutrabay-gold-100-whey-protein-concentrate",
                "image_url": "https://placehold.co/400x400/png?text=Nutrabay+Gold+100%+Whey+Protein+Concentrate"
            },
            {
                "title": "Nutrabay Pure Creatine Monohydrate",
                "price": 599.0,
                "store_name": "Nutrabay",
                "product_url": "https://nutrabay.com/product/nutrabay-pure-creatine-monohydrate",
                "image_url": "https://placehold.co/400x400/png?text=Nutrabay+Pure+Creatine+Monohydrate"
            },
            {
                "title": "Dymatize Elite 100% Whey Protein",
                "price": 6500.0,
                "store_name": "Nutrabay",
                "product_url": "/product/dymatize-elite-100-whey-protein",
                "image_url": "https://placehold.co/400x400/png?text=Dymatize+Elite+100%+Whey+Protein"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://nutrabay.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
