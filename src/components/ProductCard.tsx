"use client";

import { ProductCardProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

import { BsTrash } from "react-icons/bs";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: ProductCardProps;
  classes?: string;
  remove?: boolean;
  addToCart?: boolean;
}

const ProductCard = ({
  product,
  classes = "",
  remove = false,
  addToCart = false,
}: ProductProps) => {
  const { myProducts, setMyProducts } = useAppContext();
  const [hoveredProduct, setHoveredProduct] = useState<string>("");
  const router = useRouter();

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

  const handleAddToCart = (product: any) => {
    if (
      myProducts.find(
        (item: any) => item.name === product.name && item.cart === true
      ) === undefined
    ) {
      return setMyProducts([...myProducts, product]);
    }
  };

  const handleAddToWishlist = (product: any) => {
    if (
      myProducts.find(
        (item: any) => item.name === product.name && item === false
      ) === undefined
    ) {
      setMyProducts([...myProducts, product]);
    }
  };

  const removeItem = (id: string) => {
    let updatedList = myProducts.filter((item: any) => item.name !== id);

    setMyProducts(updatedList);
  };

  const viewProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      className={`${classes} overflow-hidden`}
      onMouseEnter={() => setHoveredProduct(product.name)}
      onMouseLeave={() => setHoveredProduct("")}
    >
      <div className="bg-bg-color relative rounded-md overflow-hidden cursor-pointer ">
        <Image
          src={product.img}
          className="mx-auto py-10 max-w-full"
          alt="product image"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-4">
          {!remove ? (
            <div
              className="bg-white p-2 rounded-full cursor-pointer hover:bg-primary  hover:text-white"
              onClick={() =>
                handleAddToWishlist({
                  id: product.id,
                  img: product.img,
                  name: product.name,
                  price: product.price,
                  stars: product.stars,
                  reviews: product.reviews,
                  cart: false,
                })
              }
            >
              <FaRegHeart />
            </div>
          ) : (
            <div
              className="bg-white p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => removeItem(product.name)}
            >
              <BsTrash />
            </div>
          )}

          <div
            onClick={() => viewProduct(product.name.replaceAll(" ", ""))}
            className="bg-white p-2 rounded-full cursor-pointer hover:bg-blue-400 hover:text-white"
          >
            <FaRegEye />
          </div>
        </div>
        {hoveredProduct === product.name || addToCart ? (
          <div
            className="absolute bottom-0 left-0 flex items-center justify-center w-full gap-3 py-2 text-white text-lg bg-black"
            onClick={() =>
              handleAddToCart({
                id: product.id,
                img: product.img,
                name: product.name,
                price: product.price,
                stars: product.stars,
                reviews: product.reviews,
                cart: true,
              })
            }
          >
            {addToCart ? <LuShoppingCart className="text-2xl" /> : ""} Add To
            Cart
          </div>
        ) : (
          ""
        )}
        {product.sale ? (
          <div className="absolute top-2 left-2 bg-primary text-white text-xl py-1 px-3 rounded-md">
            %{product.sale}
          </div>
        ) : (
          ""
        )}
      </div>
      <h1 className="my-2 text-xl font-normal line-clamp-1">{product.name}</h1>
      <div className="flex item-center gap-3 text-lg font-semibold ">
        {product.sale ? (
          <p>
            <span className="text-primary">
              ${product.price - product.price * product.sale * 0.01}
            </span>{" "}
            <span className="text-gray line-through decoration-solid">
              ${product.price}.00
            </span>
          </p>
        ) : (
          <span className="text-primary">${product.price}.00</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {handleRaiting(product.stars)}{" "}
        <span className="text-gray ml-1">({product.reviews})</span>
      </div>
    </div>
  );
};

export default ProductCard;
