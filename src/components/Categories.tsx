"use client";

import SectionHeader from "./SectionHeader";
import { IoIosTabletPortrait, IoIosLaptop } from "react-icons/io";
import { LuMouse } from "react-icons/lu";
import { BsKeyboard, BsDisplay } from "react-icons/bs";
import {
  IoGameControllerOutline,
  IoCameraOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import {
  PiWebcam,
  PiComputerTower,
  PiVirtualRealityLight,
} from "react-icons/pi";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { TbDeviceWatch } from "react-icons/tb";
import { CiMicrophoneOn } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";
import { useRouter } from "next/navigation";

export const categories = [
  { icon: <IoPhonePortraitOutline />, name: "Phones" },
  { icon: <IoIosTabletPortrait />, name: "iPads" },
  { icon: <IoIosLaptop />, name: "Laptops" },
  { icon: <LuMouse />, name: "Mouses" },
  { icon: <BsKeyboard />, name: "Keyboards" },
  { icon: <IoGameControllerOutline />, name: "Consoles" },
  { icon: <PiWebcam />, name: "WebCams" },
  { icon: <BsDisplay />, name: "Monitors" },
  { icon: <FaHeadphonesSimple />, name: "Head Phones" },
  { icon: <PiComputerTower />, name: "Computers" },
  { icon: <TbDeviceWatch />, name: "Smart Watches" },
  { icon: <CiMicrophoneOn />, name: "Microphones" },
  { icon: <PiVirtualRealityLight />, name: "Virtual Reality" },
  { icon: <VscGame />, name: "Handheld Game" },
  { icon: <IoCameraOutline />, name: "GoPro" },
];

const Categories = () => {
  const router = useRouter();

  return (
    <section>
      <SectionHeader title="Categories" />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
        {categories.map((category) => (
          <div
            className="py-7 md:py-12 px-2 border-1 border-gray rounded-lg text-center duration-500 hover:bg-primary hover:text-white hover:border-primary cursor-pointer"
            onClick={() => router.push("/products")}
            key={category.name}
          >
            <div className="text-[40px] w-fit mx-auto mb-4">
              {category.icon}
            </div>
            <h1 className="text-xl mt-3 font-normal">{category.name}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
