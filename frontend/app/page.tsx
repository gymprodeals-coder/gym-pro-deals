import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import { fetchGymDeals } from "@/lib/api";

export default async function Home() {
  const products = await fetchGymDeals();

  return (
    <>
      <Header />
      <HomeContent products={products} />
      <Footer />
    </>
  );
}
