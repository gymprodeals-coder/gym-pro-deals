import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  price: number;
  amazonLink?: string;
  flipkartLink?: string;
  healthkartLink?: string;
  updatedAt?: string;
}

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  const products: Product[] = await res.json();
  const searchToken = category.toLowerCase().replace("-", "");
  return products.filter(p =>
    p.slug !== currentSlug &&
    p.category.toLowerCase().replace("-", "").includes(searchToken)
  ).slice(0, 4);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} Price in India | Compare Deals - GymProDeals`,
    description: `Compare prices for ${product.name}. Find the best deals across Amazon, Flipkart, and top stores. Updated daily.`,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.name.split(' ')[0] || "GymProDeals Supplements"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "url": `https://gymprodeals.in/products/${product.slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "124"
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const updatedDate = product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="container">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <Image
              src={product.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"}
              alt={`${product.name} price comparison India`}
              fill
              priority
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
        <div className="col-md-6 text-light d-flex flex-column justify-content-center">
          <h1 className="fw-bold mb-3">{product.name}</h1>

          <div className="d-flex align-items-center mb-3">
            <span className="text-warning me-2">⭐⭐⭐⭐⭐ 4.8</span>
            <span className="text-secondary fs-6">(124 Customer Ratings)</span>
          </div>

          <h2 className="text-warning fw-bold mb-3 display-5">₹{product.price}</h2>
          <span className="badge bg-secondary mb-4 align-self-start fs-6">{product.category}</span>

          <p className="fs-5 mb-4">{product.description}</p>

          {/* Compare Prices */}
          <div className="p-4 bg-black border border-secondary rounded shadow-sm">
            <h3 className="h5 text-light mb-3 fw-bold">Compare Prices</h3>
            <div className="d-flex flex-column gap-3">
              {product.amazonLink && (
                <a
                  href={`${API_URL}/api/redirect/${product._id}/amazon`}
                  className="btn btn-warning btn-lg fw-bold w-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Amazon
                </a>
              )}
              {product.flipkartLink && (
                <a
                  href={`${API_URL}/api/redirect/${product._id}/flipkart`}
                  className="btn btn-primary btn-lg fw-bold w-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Flipkart
                </a>
              )}
              {product.healthkartLink && (
                <a
                  href={`${API_URL}/api/redirect/${product._id}/healthkart`}
                  className="btn btn-success btn-lg fw-bold w-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Healthkart
                </a>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-4 text-secondary small">
            <p className="mb-1">📅 <strong>Last Updated:</strong> {updatedDate}</p>
            <p><em>Affiliate Disclosure: Prices are updated daily. Some links may earn us a commission at no extra cost to you.</em></p>
          </div>
        </div>
      </div>

      {/* SEO Content Blocks */}
      <div className="row mb-5 text-light">
        <div className="col-12">
          <h2 className="fw-bold border-bottom border-warning pb-2 mb-4">Why Choose {product.name}?</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-black border border-secondary rounded h-100">
                <h3 className="h5 text-warning fw-bold">Key Benefits</h3>
                <p className="text-secondary mt-3">
                  This supplement is designed to offer maximum value and premium quality. It delivers the essential nutrition required for muscle recovery and performance enhancement, ensuring you get the best results from your fitness routine. Its fast-absorbing nature makes it a highly effective choice.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-black border border-secondary rounded h-100">
                <h3 className="h5 text-warning fw-bold">Who Should Buy It?</h3>
                <p className="text-secondary mt-3">
                  Ideal for athletes, bodybuilders, and fitness enthusiasts aiming to achieve specific goals like muscle gain, endurance, or faster recovery. If you regularly train at the gym or engage in intense physical activities, this product acts as a vital addition to your daily diet.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-black border border-secondary rounded h-100">
                <h3 className="h5 text-warning fw-bold">Quality Assured</h3>
                <p className="text-secondary mt-3">
                  Sourced from authorized sellers across leading e-commerce platforms like Amazon and Flipkart. We ensure you are comparing deals from trusted sources. Authenticity verified by thousands of customers, with industry-leading safety standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Linking: Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-5 border-top border-secondary pt-5">
          <h2 className="text-light fw-bold mb-4">Related Deals</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {relatedProducts.map((p) => (
              <div className="col" key={p._id}>
                <div className="card h-100 shadow-sm border-0 bg-black text-light border border-secondary">
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image
                      src={p.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"}
                      alt={`${p.name} price comparison India`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title fw-semibold h6 mb-2">{p.name}</h3>
                    <p className="card-text fw-bold text-warning mb-3">₹{p.price}</p>
                    <Link href={`/products/${p.slug}`} className="btn btn-outline-warning w-100 btn-sm fw-bold">
                      View Deal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
