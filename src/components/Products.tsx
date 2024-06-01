"use client";

import { discountsArr, products } from "@/constants";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { categories } from "./Categories";
import { ProductCardProps, StarsArrProps } from "@/types";
import { FaStar, FaRegStar } from "react-icons/fa";

const Products = () => {
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([
    "all",
  ]);
  const [productsShown, setProductsShown] = useState<ProductCardProps[]>([]);
  const [possition, setPosition] = useState<any>();
  const [price, setPrice] = useState({ lowest: 0, highest: 0, current: 0 });
  const [stars, setStars] = useState<number>(5);
  const [percent, setPercent] = useState<any>(0);
  const [starsQuantity, setStarsQuantity] = useState({
    oneStars: 0,
    twoStars: 0,
    threeStars: 0,
    fourStars: 0,
    fiveStars: 0,
  });

  const starsArr: StarsArrProps[] = [
    { number: 5, type: "fiveStars" },
    { number: 4, type: "fourStars" },
    { number: 3, type: "threeStars" },
    { number: 2, type: "twoStars" },
    { number: 1, type: "oneStars" },
  ];

  const handleCheckboxChange =
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCategoriesSelected([
          ...categoriesSelected,
          category.toLowerCase().replace(" ", ""),
        ]);
      } else {
        setCategoriesSelected(
          categoriesSelected.filter(
            (title) => title !== category.toLowerCase().replace(" ", "")
          )
        );
      }
    };

  const handleRadioChange =
    (percent: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setPercent(percent);
      }
    };

  useEffect(() => {
    if (categoriesSelected.length > 1) {
      setProductsShown(
        products.filter((product) =>
          categoriesSelected.includes(product.category)
        )
      );
    } else {
      setProductsShown(products);
    }
  }, [categoriesSelected]);

  useEffect(() => {
    let prices = productsShown.map((item) => item.price);
    setPrice({
      lowest: Math.min(...prices),
      highest: Math.max(...prices),
      current: Math.min(...prices),
    });

    setStarsQuantity({
      oneStars: products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= 1 &&
          product.stars > 0
      ).length,
      twoStars: products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= 2 &&
          product.stars > 1
      ).length,
      threeStars: products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= 3 &&
          product.stars > 2
      ).length,
      fourStars: products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= 4 &&
          product.stars > 3
      ).length,
      fiveStars: products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= 5 &&
          product.stars > 4
      ).length,
    });
  }, [productsShown]);

  useEffect(() => {
    const rangeInput = document.getElementById(
      "rangeInput"
    ) as HTMLInputElement;
    const priceDiv = document.getElementById("priceDiv") as HTMLInputElement;

    var left =
      ((price.current - price.lowest) / (+price.highest - price.lowest)) *
        rangeInput.clientWidth -
      priceDiv.clientWidth / 2;

    setPosition(left);
  }, [price]);

  useEffect(() => {
    setProductsShown(
      products.filter(
        (product) =>
          categoriesSelected.includes(product.category) &&
          product.stars <= stars &&
          product.stars > stars - 1
      )
    );
  }, [stars]);

  useEffect(() => {
    if (percent !== 0) {
      setProductsShown(
        products.filter((product) => product.sale && product.sale >= percent)
      );
    }
  }, [percent]);

  return (
    <section className="flex flex-col md:flex-row gap-10">
      <div className=" md:basis-[300px] ">
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="text-2xl font-semibold mb-5">Product Categories</h1>
          {categories.map((category, index) => (
            <div className="flex gap-3 items-center " key={category.name}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                className="w-4 h-4 accent-primary cursor-pointer"
                onChange={handleCheckboxChange(category.name)}
              />
              <label
                htmlFor={`checkbox-${index}`}
                className={`text-lg  ${
                  categoriesSelected.includes(
                    category.name.toLowerCase().replace(" ", "")
                  )
                    ? "text-primary font-normal"
                    : "text-black  font-light"
                } hover:text-primary cursor-pointer`}
              >
                {category.name} (
                {
                  products.filter(
                    (products) =>
                      products.category ===
                      category.name.toLowerCase().replace(" ", "")
                  ).length
                }
                )
              </label>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">Soty By</h1>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xl mb-6">Price :</p>
              <div className="w-full relative">
                <div
                  id="priceDiv"
                  className={`absolute -top-8 text-primary font-medium`}
                  style={{ left: `${possition}px` }}
                >
                  ${price.current}.00
                </div>
                <input
                  id="rangeInput"
                  type="range"
                  value={price.current}
                  onChange={(e) =>
                    setPrice({
                      lowest: price.lowest,
                      highest: price.highest,
                      current: +e.target.value,
                    })
                  }
                  min={price.lowest}
                  max={price.highest}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
              <div className="flex justify-between">
                <p>${price.lowest}</p>
                <p>${price.highest}</p>
              </div>
            </div>
            <div>
              <p className="text-xl mb-6">Reviews :</p>
              <div className="flex flex-col gap-4">
                {starsArr.map((item) => (
                  <div className="flex items-center gap-3" key={item.number}>
                    <input
                      type="radio"
                      name="review"
                      value={item.number}
                      onClick={() => setStars(item.number)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-xl text-[#FFAD33]">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= item.number ? (
                          <FaStar key={star} />
                        ) : (
                          <FaRegStar key={star} />
                        )
                      )}{" "}
                      <span className="text-gray">
                        ({starsQuantity[item.type]})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xl mb-4">Discount :</p>
              <div className="flex flex-col gap-4">
                {discountsArr.map((item) => (
                  <div className="flex items-center gap-3" key={item?.id}>
                    <input
                      type="radio"
                      name="discount"
                      id={`radio-${item.id}`}
                      value={item?.percent}
                      onChange={handleRadioChange(item?.percent)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                    <label
                      htmlFor={`radio-${item.id}`}
                      className={`${
                        item.percent === percent ? "text-primary" : "text-gray"
                      } tex-lg hover:text-primary cursor-pointer`}
                    >
                      {item?.percent}% or more
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:basis-full">
        <h1 className="text-2xl font-semibold mb-4">
          Products: ({productsShown.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10">
          {productsShown.map((product) =>
            product.price >= price.current ? (
              <ProductCard product={product} key={product.name} />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
