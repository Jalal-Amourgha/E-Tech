"use client";

import { cart } from "@/assets/icons";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";

const page = () => {
  return (
    <>
      <PageHeader name="Successful" />
      <div className="max-w-[600px] mx-auto text-center">
        <h1 className="text-3xl text-primary mb-10">Order Confirmed </h1>
        <Image
          src={cart}
          height={400}
          width={400}
          className="m-auto"
          alt="cart icon"
        />
        <p className="text-lg">
          Thank you for your purchase! Your order has been placed successfully.
          A confirmation email with your order details has been sent to your
          inbox. We appreciate your business and look forward to serving you
          again.
        </p>
      </div>
    </>
  );
};

export default page;
