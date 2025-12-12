from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class MyProteinScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Impact Whey Protein",
                "price": 2800.0,
                "store_name": "Myprotein",
                "product_url": "/sports-nutrition/impact-whey-protein/10530943.html",
                "image_url": "https://placehold.co/400x400/png?text=Impact+Whey+Protein"
            },
            {
                "title": "Clear Whey Isolate",
                "price": 2400.0,
                "store_name": "Myprotein",
                "product_url": "https://www.myprotein.co.in/sports-nutrition/clear-whey-isolate/12081395.html",
                "image_url": "https://placehold.co/400x400/png?text=Clear+Whey+Isolate"
            },
            {
                "title": "Essential BCAA 2:1:1",
                "price": 1200.0,
                "store_name": "Myprotein",
                "product_url": "/sports-nutrition/essential-bcaa-2-1-1-powder/10529280.html",
                "image_url": "https://placehold.co/400x400/png?text=Essential+BCAA+2:1:1"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.myprotein.co.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
