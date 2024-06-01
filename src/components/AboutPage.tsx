"use client";
import Image from "next/image";
import { aboutImg } from "@/assets/images";

const AboutPage = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="my-auto">
        <h1 className="text-4xl font-bold mb-10">Our Story</h1>
        <p className="text-lg mb-5">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Morocco. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p className="text-lg">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>
      <div>
        <Image src={aboutImg} alt="img" />
      </div>
    </div>
  );
};

export default AboutPage;
