from typing import List, Dict, Any
from app.scrapers.base import BaseScraper

class AmazonScraper(BaseScraper):
    async def get_deals(self) -> List[Dict[str, Any]]:
        deals = [
            {
                "title": "Optimum Nutrition (ON) Gold Standard 100% Whey",
                "price": 3050.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Optimum-Nutrition-Standard-Protein-Isolate/dp/B000QSNYGI",
                "image_url": "https://placehold.co/400x400/png?text=ON+Gold+Standard"
            },
            {
                "title": "MuscleBlaze Biozyme Performance Whey",
                "price": 2399.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/MuscleBlaze-Biozyme-Performance-Whey-Blue/dp/B07M6L8L8G",
                "image_url": "https://placehold.co/400x400/png?text=MB+Biozyme"
            },
            {
                "title": "Asitis Nutrition Atom Whey Protein",
                "price": 1750.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/AS-IT-IS-Nutrition-Atom-Whey-Protein/dp/B07K4S2X59",
                "image_url": "https://placehold.co/400x400/png?text=Asitis+Atom"
            },
            {
                "title": "GNC Pro Performance 100% Whey",
                "price": 4200.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/GNC-Amp-Gold-lbs-Double/dp/B0794QDP2Y",
                "image_url": "https://placehold.co/400x400/png?text=GNC+Pro"
            },
            {
                "title": "Isopure Low Carb Whey Protein Isolate",
                "price": 5499.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Isopure-Low-Carb-Whey-Protein-Isolate/dp/B000E8ZJGS",
                "image_url": "https://placehold.co/400x400/png?text=Isopure+Low+Carb"
            },
            {
                "title": "Dymatize Elite 100% Whey Protein",
                "price": 6800.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Dymatize-Elite-Protein-Rich-Chocolate/dp/B000GOXJ5O",
                "image_url": "https://placehold.co/400x400/png?text=Dymatize+Elite"
            },
            {
                "title": "BigMuscles Nutrition Premium Gold Whey",
                "price": 1499.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Bigmuscles-Nutrition-Premium-Gold-Whey/dp/B07K3V5X15",
                "image_url": "https://placehold.co/400x400/png?text=BigMuscles+Gold"
            },
             {
                "title": "Nakpro Platinum Whey Protein Isolate",
                "price": 2099.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Nakpro-Platinum-Whey-Protein-Isolate/dp/B07X227C9F",
                "image_url": "https://placehold.co/400x400/png?text=Nakpro+Platinum"
            },
            {
                 "title": "Scituate Nutrition Whey Protein",
                 "price": 1899.0,
                 "store_name": "Amazon",
                 "product_url": "https://www.amazon.in/Scitron-Advance-Whey-Protein-Chocolate/dp/B07P7H5X8N",
                 "image_url": "https://placehold.co/400x400/png?text=Scitron+Whey"
            },
            {
                "title": "Avvatar Whey Protein Powder",
                "price": 2200.0,
                "store_name": "Amazon",
                "product_url": "https://www.amazon.in/Avvatar-Whey-Protein-Malai-Kulfi/dp/B07CTJN6R8",
                "image_url": "https://placehold.co/400x400/png?text=Avvatar+Whey"
            }
        ]
        
        # Apply Logic: Strict URL Sanitizer
        base_domain = "https://www.amazon.in"
        
        for deal in deals:
            deal["product_url"] = self.clean_url(deal["product_url"], base_domain)
            self.validate_url(deal["product_url"])
            
        return deals
