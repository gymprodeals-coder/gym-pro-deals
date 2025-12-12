from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class NetmedsScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Pro360 Ortho for Joint Health",
                "price": 450.0,
                "store_name": "Netmeds",
                "product_url": "/prescriptions/pro360-ortho",
                "image_url": "https://placehold.co/400x400/png?text=Pro360+Ortho+for+Joint+Health"
            },
            {
                "title": "GNC PP 100% Whey",
                "price": 4400.0,
                "store_name": "Netmeds",
                "product_url": "https://www.netmeds.com/non-prescriptions/gnc-pp-whey",
                "image_url": "https://placehold.co/400x400/png?text=GNC+PP+100%+Whey"
            },
            {
                "title": "Kapiva TestoFuel",
                "price": 899.0,
                "store_name": "Netmeds",
                "product_url": "/non-prescriptions/kapiva-testofuel",
                "image_url": "https://placehold.co/400x400/png?text=Kapiva+TestoFuel"
            },
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.netmeds.com"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
