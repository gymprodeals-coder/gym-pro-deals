import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    category: string;
    price: number;
}

const VALID_CATEGORIES = ["whey-protein", "creatine", "mass-gainer", "pre-workout", "best-deals"];

async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`, { cache: 'no-store' });
    if (!res.ok) {
        return [];
    }
    return res.json();
}

export async function generateMetadata({ params }: { params: { category: string } }) {
    if (!VALID_CATEGORIES.includes(params.category)) {
        return { title: "Category Not Found" };
    }
    const title = params.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
    return {
        title: `Best ${title} Deals & Prices in India | GymProDeals`,
        description: `Compare prices for ${title} across Amazon, Flipkart and top stores. Find the best fitness deals updated daily.`,
    };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    if (!VALID_CATEGORIES.includes(params.category)) {
        notFound();
    }

    const title = params.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
    const products = await getProducts();

    // Filter products by category token
    let filteredProducts: Product[] = [];
    if (params.category === 'best-deals') {
        filteredProducts = products; // show all for best-deals, or specific logic
    } else {
        // Basic term matching for category
        const searchToken = params.category.replace("-", "").toLowerCase();
        filteredProducts = products.filter(p => p.category.toLowerCase().replace("-", "").includes(searchToken));
    }

    return (
        <div className="container">
            <section className="text-center mb-5">
                <h1 className="text-warning fw-bold mb-3 display-5">Best {title} Deals in India</h1>
                <p className="lead text-secondary">Compare prices and save on top-rated {title}.</p>
            </section>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-secondary">We're updating our deals. Check back soon!</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {filteredProducts.map((product) => (
                        <div className="col" key={product._id}>
                            <div className="card h-100 shadow-sm border-0 bg-black text-light border border-secondary">
                                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                                    <Image
                                        src={product.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"}
                                        alt={`${product.name} price comparison India`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title fw-semibold h5 mb-2">{product.name}</h3>
                                    <p className="card-text text-secondary mb-2">{product.category}</p>
                                    <p className="card-text fw-bold fs-5 text-warning">₹{product.price}</p>
                                    <Link href={`/products/${product.slug}`} className="btn btn-warning w-100 fw-bold">
                                        Compare Deals
                                    </Link>
                                </div>
                                {/* Related link inside card for SEO depth? Not extremely necessary here, linking to product is enough. */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
