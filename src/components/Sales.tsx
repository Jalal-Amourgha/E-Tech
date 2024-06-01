"use client";

import SectionHeader from "./SectionHeader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

import SliderComponent from "./Slider";
import { useAppContext } from "@/context";
import { products } from "@/constants";

const Sales = () => {
  const { slideIndex, setSlideIndex } = useAppContext();
  const [deadline, setDeadline] = useState<number>(10 * 60 * 1000);

  const handleNext = () => {
    if (slideIndex > 5) {
      setSlideIndex(1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (slideIndex < 1) {
      setSlideIndex(5);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (deadline > 0) {
        setDeadline(deadline - 1000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [deadline]);

  const getFormattedTime = (milliseconds: number) => {
    let total_seconds = parseInt(Math.floor(milliseconds / 1000).toString());
    let total_minutes = parseInt(Math.floor(total_seconds / 60).toString());
    let total_hours = parseInt(Math.floor(total_minutes / 60).toString());
    let total_days = parseInt(Math.floor(total_hours / 24).toString());

    let seconds = parseInt((total_seconds % 60).toString());
    let minutes = parseInt((total_minutes % 60).toString());
    let hours = parseInt((total_hours % 24).toString());

    return (
      <div className="flex items-center text-center gap-5">
        <div className="flex flex-col">
          <p>Days</p>
          <h1 className="text-2xl font-semibold mt-3">
            {total_days < 10 ? `0${total_days}` : total_days}
          </h1>
        </div>
        <span className="text-4xl text-primary">:</span>
        <div className="flex flex-col">
          <p>Hours</p>
          <h1 className="text-2xl font-semibold mt-3">
            {hours < 10 ? `0${hours}` : hours}
          </h1>
        </div>
        <span className="text-4xl text-primary">:</span>
        <div className="flex flex-col">
          <p>Minutes</p>
          <h1 className="text-2xl font-semibold mt-3">
            {minutes < 10 ? `0${minutes}` : minutes}
          </h1>
        </div>
        <span className="text-4xl text-primary">:</span>
        <div className="flex flex-col">
          <p>Seconds</p>
          <h1 className="text-2xl font-semibold mt-3">
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </div>
      </div>
    );
  };

  return (
    <section className="mt-100">
      <SectionHeader title="This Month" />
      <div className="flex items-center justify-center md:justify-between mb-10">
        <h1 className="hidden md:block text-3xl font-semibold">Flash Sales</h1>
        <div>{getFormattedTime(60 * 60 * 1000)}</div>
        <div className="hidden md:flex flex-row gap-5">
          <button
            className="bg-bg-color text-2xl text-black p-5 rounded-full duration-300 hover:bg-primary hover:text-white"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <button
            className="bg-bg-color text-2xl text-black p-5 rounded-full duration-300 hover:bg-primary hover:text-white"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <SliderComponent
        data={products.filter((product) => product.sale)}
        type="products"
        dots={false}
        slidesToShow={4}
      />
    </section>
  );
};

export default Sales;
