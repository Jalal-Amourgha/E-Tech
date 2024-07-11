"use client";

import { mobileLinks, navLinks } from "@/constants";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiMenuFill, RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import { useAppContext } from "@/context";
import { FiShoppingBag } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
const Nav = () => {
  const { myProducts } = useAppContext();
  const [showNav, setShowNav] = useState<boolean>(false);
  const [showProfileItems, setShowProfileItems] = useState<boolean>(false);
  const { data: session } = useSession();

  const profileItems = [
    { icon: <FiUser />, title: "My Profile" },
    { icon: <FiShoppingBag />, title: "My Orders" },
    { icon: <BiPurchaseTagAlt />, title: "My Purchases" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full bg-white z-50">
      <nav className="container relative flex justify-between items-center py-5 border-b-1 border-color">
        <h1 className="text-3xl font-bold">E-Tech</h1>
        <ul className="hidden md:flex items-center justify-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label} className="">
              <Link
                href={link.href}
                data-replace={`${link.label}`}
                className="link"
              >
                <span> {link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-5">
          <Link href="/wishlist" className="text-4xl relative">
            <IoIosHeartEmpty />
            {myProducts.filter((item: any) => item.cart === false).length >
            0 ? (
              <div className="absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center  rounded-full bg-primary text-white text-lg">
                {myProducts.filter((item: any) => item.cart === false).length}
              </div>
            ) : (
              ""
            )}
          </Link>
          <Link href="/cart" className="text-4xl relative">
            <IoCartOutline />
            {myProducts.filter((item: any) => item.cart === true).length > 0 ? (
              <div className="absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center  rounded-full bg-primary text-white text-lg">
                {myProducts.filter((item: any) => item.cart === true).length}
              </div>
            ) : (
              ""
            )}
          </Link>
          {session?.user?.email && (
            <div
              className="cursor-pointer"
              onClick={() => setShowProfileItems(!showProfileItems)}
            >
              <FiUser className="text-white text-3xl bg-primary rounded-full p-1 " />
              {showProfileItems ? (
                <div className="absolute top-[80px] right-0 p-4 rounded-lg flex flex-col gap-5 bg-black">
                  {profileItems.map((item) => (
                    <Link
                      href={"/profile"}
                      className="flex items-center text-white gap-5"
                      key={item.title}
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <p>{item.title}</p>
                    </Link>
                  ))}
                  <div
                    className="flex items-center text-white gap-5"
                    onClick={() => signOut()}
                  >
                    <div className="text-2xl">
                      <TbLogout2 />
                    </div>
                    <p>Log out</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        {/* M O B I L E - N A V */}

        <div
          className="block md:hidden text-2xl hover:text-primary cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? <RiMenuFill className="text-primary" /> : <RiMenu3Fill />}
        </div>

        <ul
          className={`md:hidden absolute top-[60px] left-0 z-50 w-full ${
            showNav ? "h-[95vh] " : "h-[0vh]"
          } duration-700 bg-white flex flex-col items-center justify-center gap-5 text-xl overflow-hidden`}
        >
          {mobileLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                data-replace={`${link.label}`}
                className="link text-[25px]"
              >
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
