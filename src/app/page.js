import Hero from "@/components/Hero";
import TopSellingProducts from "@/components/TopSellingProducts";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="bg-Grey50">
      <Hero />
      <FeaturedProducts />
      <TopSellingProducts />
    </div>
  );
}
