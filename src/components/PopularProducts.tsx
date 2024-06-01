"use client";

import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import Button from "./Button";
import { products } from "@/constants";

const PopularProducts = () => {
  return (
    <section className="my-20">
      <SectionHeader title="Best Selling" />
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold">Best Selling Products</h1>
        <Button title="View More" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7">
        {products.map((product) =>
          product.best ? (
            <ProductCard product={product} key={product.name} />
          ) : (
            ""
          )
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
