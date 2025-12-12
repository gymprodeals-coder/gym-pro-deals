from abc import ABC, abstractmethod
from typing import List, Dict, Any
import logging
from urllib.parse import urljoin

class BaseScraper(ABC):
    @abstractmethod
    async def get_deals(self) -> List[Dict[str, Any]]:
        """
        Fetch deals from the source.
        Returns a list of dictionaries with keys:
        - title: str
        - price: float
        - store_name: str
        - product_url: str
        - image_url: str
        """
        pass

    def validate_url(self, url: str):
        if not url.startswith("http"):
            print(f"CRITICAL URL WARNING: Scraper returned non-absolute URL: {url}")

    def clean_url(self, url: str, base_domain: str) -> str:
        """
        Sanitizes and normalizes URLs to prevent 404s.
        """
        if not url:
            return ""
        
        # 1. Strip whitespace
        clean = url.strip()
        
        # 2. Handle relative URLs efficiently
        # urljoin handles base ending with / or not correctly
        full_url = urljoin(base_domain, clean)
        
        # 3. Apollo Specific Fixes
        if "apollopharmacy.in" in base_domain:
             # Example fix: if it somehow formed double slashes or weird content
             pass

        # 4. Flipkart Specific Fixes
        if "flipkart.com" in base_domain:
            # Example: remove tracking params if needed, for now keep simple
            pass

        return full_url
