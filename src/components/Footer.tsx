"use client";

import { footerLinks, sponsors } from "@/constants";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  <FaFacebookF />,
  <FaInstagram />,
  <FaXTwitter />,
  <FaTiktok />,
  <FaWhatsapp />,
];

const Footer = () => {
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-100 mb-10">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>
            <Image
              src={sponsor.icon}
              width={150}
              height={150}
              className="mx-auto grayscale"
              alt="img"
            />
          </div>
        ))}
      </section>
      <footer className="bg-black py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            <div className="col-span-2 text-white">
              <h1 className="text-3xl text-white font-bold mb-4">E-Tech</h1>
              <p className="w-2/3">
                We are committed to providing you with a seamless and enjoyable
                shopping experience. For any questions or concerns, our customer
                service team is here to help.
              </p>
              <div className="flex gap-3 mt-5">
                {socials.map((social, index) => (
                  <div
                    className="bg-bg-color text-primary rounded-full text-2xl p-2 duration-300 hover:bg-primary hover:text-white cursor-pointer"
                    key={index}
                  >
                    {social}
                  </div>
                ))}
              </div>
            </div>
            {footerLinks.map((item) => (
              <div key={item.label}>
                <h1 className="text-xl text-white font-semibold mb-3">
                  {item.label}
                </h1>

                <ul className="flex flex-col gap-3 text-slate-300 text-">
                  {item.links.map((link) => (
                    <li key={link.value}>{link.value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[1px] w-full bg-gray my-10"></div>
          <p className="text-center text-gray">
            &#xa9; Copyright 2024. All right reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
