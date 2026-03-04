import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  const wheyProteins = products.filter(p => p.category.toLowerCase().includes('whey'));
  const creatines = products.filter(p => p.category.toLowerCase().includes('creatine'));
  const preWorkouts = products.filter(p => p.category.toLowerCase().includes('pre-workout') || p.category.toLowerCase().includes('preworkout'));
  const otherSupplements = products.filter(p => !p.category.toLowerCase().includes('whey') && !p.category.toLowerCase().includes('creatine') && !p.category.toLowerCase().includes('pre-workout') && !p.category.toLowerCase().includes('preworkout'));

  const ProductCard = ({ product }: { product: Product }) => (
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
      </div>
    </div>
  );

  return (
    <div>
      <section className="text-center mb-5">
        <h1 className="text-warning fw-bold mb-3 display-4">Best Gym Supplement Deals in India</h1>
        <p className="lead text-secondary">Compare prices and find the best offers on premium fitness supplements.</p>

        {/* Internal Linking: Quick Category Links */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link href="/whey-protein" className="btn btn-outline-warning">Whey Protein</Link>
          <Link href="/creatine" className="btn btn-outline-warning">Creatine</Link>
          <Link href="/mass-gainer" className="btn btn-outline-warning">Mass Gainer</Link>
          <Link href="/pre-workout" className="btn btn-outline-warning">Pre-Workout</Link>
          <Link href="/best-deals" className="btn btn-warning fw-bold text-dark">Best Deals</Link>
        </div>
      </section>

      {/* Whey Protein Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light fw-bold m-0 border-start border-warning border-4 ps-3">Top Whey Protein Deals</h2>
          <Link href="/whey-protein" className="text-warning text-decoration-none">View All &rarr;</Link>
        </div>
        {wheyProteins.length === 0 ? (
          <p className="text-secondary text-center">No deals found yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {wheyProteins.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Creatine Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light fw-bold m-0 border-start border-warning border-4 ps-3">Best Creatine Offers</h2>
          <Link href="/creatine" className="text-warning text-decoration-none">View All &rarr;</Link>
        </div>
        {creatines.length === 0 ? (
          <p className="text-secondary text-center">No deals found yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {creatines.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Pre-Workout Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light fw-bold m-0 border-start border-warning border-4 ps-3">Top Pre-Workout Deals</h2>
          <Link href="/pre-workout" className="text-warning text-decoration-none">View All &rarr;</Link>
        </div>
        {preWorkouts.length === 0 ? (
          <p className="text-secondary text-center">No deals found yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {preWorkouts.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Trending Fitness Supplements Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light fw-bold m-0 border-start border-warning border-4 ps-3">Trending Fitness Supplements</h2>
          <Link href="/best-deals" className="text-warning text-decoration-none">View All &rarr;</Link>
        </div>
        {otherSupplements.length === 0 ? (
          <p className="text-secondary text-center">No deals found yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {otherSupplements.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
