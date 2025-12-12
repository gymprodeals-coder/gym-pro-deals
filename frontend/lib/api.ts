export interface Deal {
    title: string;
    price: number;
    store_name: string;
    product_url: string;
    image_url: string;
}

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
    try {
        const res = await fetch("http://127.0.0.1:8000/api/deals/gym", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch deals");
        }

        const json = await res.json();
        const rawDeals: Deal[] = json.data;

        // Processing Logic
        const productsMap = new Map<string, Product>();

        rawDeals.forEach((deal) => {
            // Simple normalization for grouping
            const key = deal.title.trim().toLowerCase();

            if (!productsMap.has(key)) {
                productsMap.set(key, {
                    id: key,
                    title: deal.title,
                    brand: guessBrand(deal.title),
                    image_url: deal.image_url,
                    price: deal.price,
                    original_price: Math.round(deal.price * 1.4), // Mock original price
                    rating: 4.0 + Math.random(), // Mock rating
                    stores: [],
                    category: guessCategory(deal.title)
                });
            }

            const product = productsMap.get(key)!;

            // Update lowest price logic
            if (deal.price < product.price) {
                product.price = deal.price;
                // Maybe update image to the cheapest one?
            }

            product.stores.push({
                name: deal.store_name,
                price: deal.price,
                url: deal.product_url
            });
        });

        return Array.from(productsMap.values());

    } catch (error) {
        console.error("Error fetching deals:", error);
        return [];
    }
}

function guessBrand(title: string): string {
    const brands = ["Optimum Nutrition", "MuscleBlaze", "GNC", "MuscleTech", "Asitis", "Bigmuscles"];
    for (const b of brands) {
        if (title.toLowerCase().includes(b.toLowerCase())) return b;
    }
    return "Generic";
}

function guessCategory(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes("whey")) return "Whey Protein";
    if (lower.includes("creatine")) return "Creatine";
    if (lower.includes("bcaa")) return "BCAA";
    if (lower.includes("multivitamin")) return "Multivitamin";
    return "Supplements";
}
