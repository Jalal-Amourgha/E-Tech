"use client";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { useEffect } from "react";
import Button from "./Button";
import { useAppContext } from "@/context";
import { ProductCardProps } from "@/types";
import { useRouter } from "next/navigation";
import CartTotal from "./CartTotal";

export const CartProducts = () => {
  const { myProducts, setMyProducts, quantities, setQuantities } =
    useAppContext();

  const router = useRouter();

  useEffect(() => {
    const initialQuantities: any = {};
    myProducts.forEach((item: ProductCardProps) => {
      if (item.cart) {
        initialQuantities[item.name] = 1;
      }
    });
    setQuantities(initialQuantities);
  }, [myProducts]);

  const handleQuantityChange = (itemName: any, quantity: any) => {
    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  };

  const removeItem = (id: string) => {
    let updatedList = myProducts.filter((item: any) => item.name !== id);

    setMyProducts(updatedList);
  };

  const clearList = () => {
    let clearAddToCartList = myProducts.filter((item: any) => !item.cart);

    setMyProducts(clearAddToCartList);
  };

  return (
    <div>
      {myProducts.filter((product: any) => product.cart).length === 0 ? (
        <h1 className="text-3xl text-center font-semibold mt-10">
          Currently, your Cart is empty
        </h1>
      ) : (
        <div className="flex flex-col mt-10 ">
          {myProducts
            .filter((product: any) => product.cart)
            .map((product: any, index: number) => (
              <div
                className={`grid grid-cols-4  items-center text-xl py-5 ${
                  index !==
                  myProducts.filter((product: any) => product.cart).length - 1
                    ? "border-b-1 border-gray"
                    : ""
                }`}
                key={product.name}
              >
                <div className="flex items-center gap-3 relative">
                  <Image
                    src={product.img}
                    className="max-w-[80px]"
                    alt="product img"
                  />
                  <p className="hidden md:block font-medium">{product.name}</p>
                  <FiTrash2
                    className="absolute -left-7 top-7 text-2xl text-primary cursor-pointer"
                    onClick={() => removeItem(product.name)}
                  />
                </div>
                <p className="text-center">${product.price}.00</p>
                <input
                  type="number"
                  className="w-[100px] h-fit py-3 px-2 mx-auto text-center border-1 border-gray rounded-lg"
                  value={quantities[product.name] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.name, parseInt(e.target.value))
                  }
                  max={100}
                  min={0}
                />
                <p className="text-end">
                  ${product.price * (quantities[product.name] || 1)}.00
                </p>
              </div>
            ))}
        </div>
      )}

      <div className="flex items-center justify-between my-10">
        <Button
          title="Back To Shop"
          onClick={() => router.push("/products")}
          border={true}
        />
        <Button title="Clear Cart" onClick={clearList} border={true} />
      </div>
    </div>
  );
};

export const SelectedProducts = () => {
  const { myProducts, setMyProducts, quantities } = useAppContext();

  return (
    <div className="div">
      <h1 className="text-2xl font-normal mb-10">Products Selected</h1>
      <div className="flex flex-col gap-5 mb-10">
        {myProducts
          .filter((product: any) => product.cart)
          .map((product: ProductCardProps, index: number) => (
            <div className="flex justify-between items-center" key={index}>
              <div className="flex items-center gap-5">
                <Image
                  src={product.img}
                  width={80}
                  height={80}
                  alt="product img"
                />
                <h1>{product.name}</h1>{" "}
                <div className="text-primary">X {quantities[product.name]}</div>
              </div>
              <p>${product.price * (quantities[product.name] || 1)}.00</p>
            </div>
          ))}
      </div>
      <CartTotal process={false} />
    </div>
  );
};
