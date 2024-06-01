import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Sales from "@/components/Sales";
import Services from "@/components/Services";
import Underline from "@/components/Underline";

export default function Home() {
  return (
    <div className="container px-2 md:px-0">
      <Hero />
      <Sales />

      <Underline />
      <PopularProducts />

      <Underline />
      <Categories />
      <Underline />
      <Services />
      <Underline />
    </div>
  );
}
