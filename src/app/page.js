import Hero from "@/components/Hero";
import TopSellingProducts from "@/components/TopSellingProducts";
import FeaturedProducts from "@/components/FeaturedProducts";


export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedProducts/>
      <TopSellingProducts/>
    </div>
  );
}
