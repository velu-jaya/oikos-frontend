import FeaturedProperties from "../../components/FeaturedProperties";
import sampleProperties from "../../data/properties";

export default function SearchPage({ searchParams }) {
  // `searchParams` is a Next.js app dir prop for query params in server components
  const city = searchParams?.city ?? "";
  const address = searchParams?.address ?? "";

  const normalizedCity = city.trim().toLowerCase();
  const normalizedAddress = address.trim().toLowerCase();

  const results = sampleProperties.filter((p) => {
    const matchesCity = normalizedCity ? p.city.toLowerCase().includes(normalizedCity) : true;
    const matchesAddress = normalizedAddress ? p.title.toLowerCase().includes(normalizedAddress) : true;
    return matchesCity && matchesAddress;
  });

  return (
    <div style={{ padding: 24 }}>
      <h1>Search Results</h1>
      <p>{results.length} properties found for {city || "any city"} {address ? `address: ${address}` : ""}</p>
      <FeaturedProperties properties={results} />
    </div>
  );
}
