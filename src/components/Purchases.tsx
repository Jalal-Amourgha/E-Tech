"use client";

import { OrderProps } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Purchases = ({ data }: { data?: OrderProps[] }) => {
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
          It looks like you haven't added any products to your cart yet. Don't
          miss out on the latest tech gadgets and deals!
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
      <h1 className="text-2xl text-primary mb-5">Purchased Products</h1>
      <div className="flex flex-col gap-5">
        {data?.map((product) => (
          <div className="flex flex-row gap-5" key={product.name}>
            <div className="w-28">
              <Image
                src={product.img}
                className="max-w-full p-2 bg-bg-color rounded-lg"
                alt="product img"
              />
            </div>

            <div>
              <h1 className="text-lg font-semibold mb-2">{product.name}</h1>
              <p className="text-gray">${product.price},00</p>
              <p className="text-gray">
                Purchased On : {handlePurchasedAt(product.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchases;
