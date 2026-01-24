import dealsData from '../data/deals.json';

// Type definitions to match our app's needs
export interface Product {
    id: string;
    title: string;
    brand: string;
    image_url: string;
    price: number;
    original_price: number;
    rating: number;
    stores: Array<{ name: string; price: number; url: string }>;
    category: string;
}

export async function fetchGymDeals(): Promise<Product[]> {
    // Simulate network delay for realism if needed, or keep it instant
    // Using local data ensures reliability and speed

    try {
        // Map the flat JSON structure to our grouped Product structure
        // In the JSON, we might have duplicates for the same product from different stores,
        // or just single entries. The logic below handles grouping by normalized title.

        const productsMap = new Map<string, Product>();

        dealsData.forEach((deal) => {
            const key = deal.id || deal.title.trim().toLowerCase();

            if (!productsMap.has(key)) {
                productsMap.set(key, {
                    id: key,
                    title: deal.title,
                    brand: deal.brand || "Generic",
                    image_url: deal.image_url,
                    price: deal.price,
                    original_price: deal.original_price || Math.round(deal.price * 1.2),
                    rating: deal.rating || 4.5,
                    stores: [],
                    category: deal.category || "Supplements"
                });
            }

            const product = productsMap.get(key)!;

            // If we have multiple entries for the same product, we can pick the best price here
            // For now, our JSON is mostly unique items, but we add the store info
            product.stores.push({
                name: deal.store_name || "Best Deal",
                price: deal.price,
                url: deal.product_url
            });

            // Ensure main price/image reflects the current best deal entry if we were merging
            // Since we push to stores, the UI often picks stores[0] or we can sort stores by price
            // Let's assume the JSON entry is authoritative for the main display properties
        });

        // Convert grouped map to array and sort by category/popularity if needed
        return Array.from(productsMap.values());

    } catch (error) {
        console.error("Error loading local deals:", error);
        return [];
    }
}

