"use client";

import { BillingInformationsProps, ProductCardProps } from "@/types";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [myProducts, setMyProducts] = useState([]);
  const [myBillingInformations, setMyBillingInformations] =
    useState<BillingInformationsProps>();
  const [loading, setLaoding] = useState(false);
  const [quantities, setQuantities] = useState<any>({});
  const [slideIndex, setSlideIndex] = useState<number>(0);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("products-etech") as string) || [];

    setMyProducts(savedWishlist);
    const timer = setTimeout(() => {
      setLaoding(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getTotalPrice = () => {
    let totalPrice = 0;
    myProducts.forEach((item: ProductCardProps) => {
      if (item.cart) {
        const quantity = quantities[item.name] || 1;
        totalPrice += item.price * quantity;
      }
    });
    return totalPrice;
  };

  useEffect(() => {
    if (loading) {
      localStorage.setItem("products-etech", JSON.stringify(myProducts));
    }
  }, [myProducts, loading]);

  return (
    <AppContext.Provider
      value={{
        myProducts,
        setMyProducts,
        quantities,
        setQuantities,
        getTotalPrice,
        slideIndex,
        setSlideIndex,
        myBillingInformations,
        setMyBillingInformations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
