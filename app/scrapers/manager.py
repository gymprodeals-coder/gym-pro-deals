import asyncio
import importlib
import inspect
import os
import sys
from typing import List, Dict, Any, Type
from app.scrapers.base import BaseScraper

# Helper to find scraper classes in a directory
def _discover_scrapers(category: str) -> List[BaseScraper]:
    scrapers = []
    
    # Construct the package path (e.g., app.scrapers.gym)
    package_name = f"app.scrapers.{category}"
    
    # Determine the directory path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    category_dir = os.path.join(current_dir, category)
    
    if not os.path.exists(category_dir):
        print(f"[{category}] Directory not found: {category_dir}")
        return []

    # Iterate over files
    for filename in os.listdir(category_dir):
        if filename.endswith(".py") and filename != "__init__.py":
            module_name = filename[:-3]
            full_module_name = f"{package_name}.{module_name}"
            
            try:
                # Dynamically import the module
                # In case of module reload issues during development, we might want importlib.reload
                # but for now standard import is fine.
                if full_module_name in sys.modules:
                     module = importlib.reload(sys.modules[full_module_name])
                else:
                     module = importlib.import_module(full_module_name)
                
                # Find BaseScraper subclass
                found_class = False
                for name, obj in inspect.getmembers(module):
                    if (inspect.isclass(obj) and 
                        issubclass(obj, BaseScraper) and 
                        obj is not BaseScraper):
                        
                        try:
                            instance = obj()
                            scrapers.append(instance)
                            found_class = True
                            # Assuming one scraper per file for simplicity
                            break 
                        except Exception as e:
                            print(f"Error instantiating {name} in {filename}: {e}")
                            
                if not found_class:
                    # Optional: print if no scraper class found in a .py file
                    pass
                    
            except Exception as e:
                print(f"Skipping {filename} due to import error: {e}")
                continue

    return scrapers

async def _safe_get_deals(scraper: BaseScraper) -> List[Dict[str, Any]]:
    """
    Safely runs scraper.get_deals() handling any exceptions.
    """
    try:
        deals = await scraper.get_deals()
        return deals
    except Exception as e:
        print(f"Error running scraper {scraper.__class__.__name__}: {e}")
        return []

async def run_category_scrapers(category: str) -> List[Dict[str, Any]]:
    """
    Finds and runs all scrapers in app/scrapers/{category}/ concurrently.
    """
    scrapers = _discover_scrapers(category)
    
    if not scrapers:
        return []

    # Run safely in parallel
    tasks = [_safe_get_deals(scraper) for scraper in scrapers]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    all_deals = []
    for res in results:
        if isinstance(res, list):
            all_deals.extend(res)
        else:
            # unexpected error from gather itself or something missed
            print(f"Unexpected error in scraper result aggregation: {res}")
            
    return all_deals

def get_loaded_scraper_names(category: str) -> List[str]:
    """
    Returns names of all discoverable scraper classes for debugging.
    """
    scrapers = _discover_scrapers(category)
    return [scraper.__class__.__name__ for scraper in scrapers]
