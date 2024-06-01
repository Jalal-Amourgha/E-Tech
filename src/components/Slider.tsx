"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import React from "react";
import { useAppContext } from "@/context";
import TeamCard from "./TeamCard";

interface SliderProps {
  data: any[];
  type?: string;
  dots?: boolean;
  slidesToShow?: number;
  autoplay?: boolean;
}

const SliderComponent = ({
  data,
  type,
  dots = false,
  slidesToShow = 4,
  autoplay = false,
}: SliderProps) => {
  const { slideIndex } = useAppContext();
  let sliderRef: any;

  useEffect(() => {
    sliderRef.slickGoTo(slideIndex);
  }, [slideIndex]);

  var settings = {
    dots: dots,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    autoplay: autoplay,

    responsive: [
      {
        breakpoint: 1304,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToShow,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {data.map((item) =>
          type === "products" ? (
            <ProductCard product={item} classes="mx-4" key={item.name} />
          ) : (
            <TeamCard member={item} classes="mx-4" key={item.name} />
          )
        )}
      </Slider>
    </div>
  );
};

export default SliderComponent;
