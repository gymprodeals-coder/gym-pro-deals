from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class Tata1mgScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Ensure Diabetes Care",
                "price": 750.0,
                "store_name": "Tata 1Mg",
                "product_url": "/otc/ensure-diabetes-care-vanilla-delight-powder-otc339655",
                "image_url": "https://placehold.co/400x400/png?text=Ensure+Diabetes+Care"
            },
            {
                "title": "Protinex Health And Nutritional Drink",
                "price": 600.0,
                "store_name": "Tata 1Mg",
                "product_url": "https://www.1mg.com/otc/protinex-health-and-nutritional-drink-tasty-chocolate-otc329156",
                "image_url": "https://placehold.co/400x400/png?text=Protinex+Health+And+Nutritional+Drink"
            },
            {
                "title": "MuscleBlaze Whey Gold",
                "price": 3500.0,
                "store_name": "Tata 1Mg",
                "product_url": "/otc/muscleblaze-whey-gold-rich-milk-chocolate-otc538356",
                "image_url": "https://placehold.co/400x400/png?text=MuscleBlaze+Whey+Gold"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.1mg.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
