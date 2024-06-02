"use client";

import { OrderProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { format } from "date-fns/format";

const Orders = ({ data }: { data?: OrderProps[] }) => {
  const [showOrder, setShowOrder] = useState("");
  const router = useRouter();

  const handlePurchasedAt = (date = "") => {
    return format(new Date(date), "d/MM/yyyy");
  };

  if (data?.length === 0) {
    return (
      <div className="">
        <h1 className="text-2xl font-medium text-primary mb-10">
          Your Cart is Empty!
        </h1>
        <p className="text-xl w-2/3">
          It looks like you haven&apos;t added any products to your cart yet.
          Don&apos;t miss out on the latest tech gadgets and deals!
        </p>
        <p className="text-xl mt-10 mb-5 w-2/3">
          Start shopping now and fill your cart with amazing tech products! If
          you need any assistance, our support team is here to help.
        </p>
        <Button title="Go To Shop" onClick={() => router.push("/products")} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl text-primary">My Orders</h1>
      <div className="flex flex-col gap-5 mt-10">
        {data?.map((order) => (
          <div className="flex flex-col relative" key={order.name}>
            <h1 className="text-lg font-semibold mb-2 line-clamp-1">
              Order_id: {order.order_id}
            </h1>
            <p
              className="absolute top-0 right-0 text-gray cursor-pointer hover:text-primary"
              onClick={() => setShowOrder(order.order_id)}
            >
              View Order
            </p>

            <p className="text-gray mb-1">
              Total: ${+order.price * order.quantity}.00
            </p>
            <p className="text-gray">
              Ordered On: {handlePurchasedAt(order.date)}
            </p>
            {showOrder === order.order_id ? (
              <div className="flex flex-row items-center gap-5 mt-5">
                <div className="w-20">
                  <Image
                    src={order.img}
                    className="max-w-full p-2 bg-bg-color rounded-lg"
                    alt="order img"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium mb-2">{order.name}</h1>
                  <p className="text-gray mb-1">Quantity: {order.quantity}</p>
                  <p className="text-gray">${order.price}.00</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
