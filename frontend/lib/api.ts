export interface Product {
    id: string | number;
    name: string;
    image: string;
    description: string;
    amazonLink?: string;
    flipkartLink?: string;
    healthkartLink?: string;
    category: string;
    lastUpdated: string;
}

export async function fetchProducts(): Promise<Product[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/products';
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
