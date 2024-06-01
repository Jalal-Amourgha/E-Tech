"use client";
import { FaUsers } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { FaBoxesStacked } from "react-icons/fa6";
import { MdOutlineSentimentSatisfiedAlt } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";
import { FaAward } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { CiShop } from "react-icons/ci";
import SectionHeader from "@/components/SectionHeader";
import { stats } from "@/constants";
import { useState } from "react";
const Statistics = () => {
  const [hovered, setHovered] = useState(-1);
  let icons = [
    <RiMoneyDollarCircleLine />,
    <CiShop />,
    <FaUsers />,
    <TbStarsFilled />,
    <FaBoxesStacked />,
    <MdOutlineSentimentSatisfiedAlt />,
    <TbWorldCheck />,
    <CgWebsite />,
  ];

  return (
    <div className="container mt-100">
      <SectionHeader title="Statistics" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-10">
        {stats.map((stat, index) => (
          <div
            className="bg-white p-1 md:p-5 border-1 border-gray rounded-lg text-center duration-500 hover:bg-primary hover:text-white cursor-pointer"
            key={stat.label}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(-1)}
          >
            <div
              className={`h-20 w-20 ${
                hovered === index
                  ? "bg-white text-black border-white"
                  : "bg-black text-white  border-bg-color"
              } duration-500 rounded-full flex justify-center items-center text-[40px] border-[10px]  mx-auto`}
            >
              {icons[index]}
            </div>
            <h1 className="text-3xl font-bold my-5">{stat.value}</h1>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
