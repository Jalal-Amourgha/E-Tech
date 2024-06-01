"use client";

import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import PageHeader from "@/components/PageHeader";
import { useAppContext } from "@/context";
import { products } from "@/constants";

const WishlistPage = () => {
  const { myProducts } = useAppContext();

  return (
    <>
      <div className="container">
        <PageHeader name="Wishlist" />
        <div className="flex justify-between items-center">
          <p className="text-2xl">
            Wishlist (
            {myProducts.filter((product: any) => !product.cart).length})
          </p>
          <Button title="Move All to Bag" border={true} />
        </div>
        {myProducts.filter((product: any) => !product.cart).length === 0 ? (
          <h1 className="text-3xl text-center font-semibold mt-10">
            Currently, your Wishlist is empty
          </h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
            {myProducts
              .filter((product: any) => !product.cart)
              .map((product: any) => (
                <ProductCard
                  product={product}
                  remove={true}
                  addToCart={true}
                  key={product.name}
                />
              ))}
          </div>
        )}

        <SectionHeader title="Just For You" classes="mt-100" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map(
            (product) =>
              product.sale && (
                <ProductCard product={product} key={product.name} />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
