"use client";

import { useAppContext } from "@/context";
import Button from "./Button";
import { useRouter } from "next/navigation";

const CartTotal = ({
  classes,
  process,
}: {
  classes?: string;
  process: boolean;
}) => {
  const { getTotalPrice } = useAppContext();
  const router = useRouter();
  return (
    <div
      className={`border-1 border-gray rounded-lg p-4 ${classes} max-w-[500px]`}
    >
      <h1 className="text-xl font-medium mb-5">Cart Total</h1>
      <div className="flex justify-between items-center ">
        <p>SubTotal:</p>
        <p>${getTotalPrice()}.00</p>
      </div>
      <div className="h-[1px] w-full bg-gray my-5"></div>
      <div className="flex justify-between items-center">
        <p>Shipping:</p>
        <p>{getTotalPrice() > 1000 ? "Free Shipping" : "$50.00"}</p>
      </div>
      <div className="h-[1px] w-full bg-gray my-5"></div>
      <div className="flex justify-between items-center">
        <p>Total:</p>
        <p>
          ${getTotalPrice() > 1000 ? getTotalPrice() : getTotalPrice() + 50}.00
        </p>
      </div>
      {process ? (
        <Button
          title="Process to Checkout"
          classes="mx-auto mt-5"
          onClick={() => router.push("/billing")}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CartTotal;
