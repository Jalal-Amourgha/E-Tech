import type { Metadata } from "next";

import Products from "@/components/Products";

const page = () => {
  return (
    <div className="container my-100">
      <Products />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Products",
  description: "Generated by create next app",
};