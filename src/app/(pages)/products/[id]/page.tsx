"use client";

import { product1, product10, product25 } from "@/assets/images";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { products } from "@/constants";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { FaStar, FaStarHalfAlt, FaShippingFast } from "react-icons/fa";
import { PiArrowsClockwise } from "react-icons/pi";
import { LuShoppingCart } from "react-icons/lu";
import { useAppContext } from "@/context";

interface PageProps {
  params: {
    id: string;
  };
}

const ProductPage: FC<PageProps> = ({ params }) => {
  const { myProducts, setMyProducts } = useAppContext();
  const [hoveredItem, setHoveredItem] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  let product =
    products[
      products.findIndex(
        (product) => product.name.replaceAll(" ", "") === params.id
      )
    ];

  const handleRaiting = (n: any) => {
    let arr = [];
    let stars = n;

    // returning number into interger Number
    if (!Number.isInteger(n)) {
      if (n === Math.fround(n)) {
        stars = n;
      } else if (+(n + "").split(".")[1] > 5) {
        stars = +(n + "").split(".")[0] + 0.5;
      } else {
        stars = (n + "").split(".")[0];
      }
    }

    // creating the stars array
    for (let i = 1; i <= 5; i++) {
      if (stars >= 1) {
        arr.push(<FaStar className="text-[#FFAD33]" />);
      } else if (stars === 0.5) {
        arr.push(<FaStarHalfAlt className="text-[#FFAD33]" />);
        stars = stars - 0.5;
      } else if (stars <= 0) {
        arr.push(<FaStar className="text-gray" />);
      }

      stars = stars - 1;
    }

    return arr.map((icon, index) => <div key={index}>{icon}</div>);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (product: any) => {
    if (
      myProducts.find(
        (item: any) => item.name === product.name && item.cart === true
      ) === undefined
    ) {
      return setMyProducts([...myProducts, product]);
    }
  };

  if (!product) {
    return <h1 className="text-4xl text-center ">Loading ...</h1>;
  }
  return (
    <div className="container my-100">
      <div className="flex flex-col md:flex-row w-full gap-10 mb-100">
        <div className="basis-1/2 flex flex-col  md:flex-row gap-5">
          <div className="grid grid-cols-4 md:grid-cols-1 gap-5">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                className={`bg-bg-color p-2 rounded-md ${
                  hoveredItem === item
                    ? "outline outline-offset-4 outline-4 outline-primary"
                    : ""
                } cursor-pointer`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(-1)}
                key={index}
              >
                <Image
                  src={product.img}
                  className="max-w-[70%] m-auto"
                  alt="product img"
                />
              </div>
            ))}
          </div>
          <div className="bg-bg-color w-full h-full rounded-md relative flex justify-center items-center cursor-pointer">
            <Image
              src={product.img}
              className="w-[250px] py-20 md:py-0 "
              alt="product img"
            />
          </div>
        </div>
        <div className="basis-1/2">
          <h1 className="text-2xl font-medium mb-4">{product.name}</h1>
          <div className="flex items-center gap-5 mb-3">
            <p className="text-lg text-gray">
              <span className="capitalize">{product.category}</span> |{" "}
              <span className="text-green-400">In Stock</span>
            </p>
            <div className="flex flex-row items-center gap-1">
              {handleRaiting(product.stars)}{" "}
              <span className="text-gray">({product.reviews} Reviews)</span>
            </div>
          </div>
          <h1 className="text-2xl font-medium my-6">${product.price}.00</h1>

          <h1 className="text-lg font-bold mb-2">Description</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
            autem sed non omnis tempore nihil fuga voluptatem itaque impedit
            tempora, facilis nemo rerum. Repellat ab fugiat aut at ipsum
            temporibus?
          </p>
          <div className="w-full h-[2px] bg-gray my-6"></div>

          <div className="grid grid-cols-[120px_calc(100%-120px)] md:grid-cols-[180px_calc(100%-180px)] gap-3 mb-3">
            <div className="w-full grid grid-cols-[30px_60px_30px] md:grid-cols-[45px_90px_45px] border-1 border-gray rounded-md text-xl overflow-hidden ">
              <button
                className="py-2 border-e-1 border-gray duration-300 hover:bg-primary hover:text-white"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="py-2 border-l-1 border-gray duration-300 hover:bg-primary hover:text-white"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button
              title="Add To Cart"
              classes="w-full flex justify-center items-center gap-2"
              icon={<LuShoppingCart className="text-2xl" />}
              onClick={() =>
                handleAddToCart({
                  id: product.id,
                  img: product.img,
                  name: product.name,
                  price: product.price,
                  stars: product.stars,
                  review: product.reviews,
                  cart: true,
                })
              }
            />
          </div>
          <div className="flex items-center gap-5 p-3 border-1 border-gray rounded-t-md mt-5">
            <FaShippingFast className="text-3xl" />
            <div>
              <h1 className="text-xl font-medium mb-2">Fast Delivery</h1>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-1 border-gray border-t-0 rounded-b-md">
            <PiArrowsClockwise className="text-3xl" />
            <div>
              <h1 className="text-xl font-medium mb-2">Return Delivery</h1>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
      <SectionHeader title="Related Products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((item, index) =>
          item.category === product.category ? (
            <ProductCard product={item} key={index} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default ProductPage;
