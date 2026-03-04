import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let products = [];
  try {
    const res = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error("Sitemap fetch failed");
  }

  const productEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `https://gymprodeals.in/products/${product.slug}`,
    lastModified: new Date(product.createdAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categories = [
    "whey-protein",
    "creatine",
    "mass-gainer",
    "pre-workout",
    "best-deals"
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `https://gymprodeals.in/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [
    {
      url: "https://gymprodeals.in/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://gymprodeals.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://gymprodeals.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://gymprodeals.in/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryEntries,
    ...productEntries,
  ];
}
