"use client";

import { SelectedProducts } from "@/components/AddedCartProducts";

import BillingDetails from "@/components/BillingDetails";
import PageHeader from "@/components/PageHeader";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <PageHeader name="Billing" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <SelectedProducts />
        <BillingDetails />
      </div>
    </div>
  );
};

export default page;
