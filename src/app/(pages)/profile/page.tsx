"use client";
import { FaRegCircleUser, FaRegCreditCard } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import EditProfile from "@/components/EditProfile";
import Purchases from "@/components/Purchases";
import Orders from "@/components/Orders";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { UserDataProps } from "@/types";

let filterOptions = [
  { icon: <FaRegUser className="text-2xl" />, title: "Personal Information" },
  { icon: <FaRegCreditCard className="text-2xl" />, title: "My Purchases" },
  { icon: <BsBoxSeam className="text-2xl" />, title: "My Orders" },
];

const MyProfile = () => {
  const [optionSelected, setOptionSelected] = useState<string>(
    "Personal Information"
  );
  const [userData, setUserData] = useState<UserDataProps>();
  const { data: session } = useSession();
  let fetchOneTime = true;

  const fetchUserInfo = async (id: string) => {
    const response = await fetch(`/api/user/${id}/infos`);
    const data = await response.json();

    setUserData(data);
  };

  useEffect(() => {
    if (session?.user?.email && fetchOneTime) {
      fetchUserInfo(session?.user?.email);
    }
    fetchOneTime = false;
  }, [session?.user?.email, fetchOneTime]);

  return (
    <>
      <section className="container mt-[200px]">
        <div className="flex flex-col md:flex-row gap-10 ">
          <div className="md:basis-[500px]">
            <div className="flex items-center gap-5 mb-8">
              <FaRegCircleUser className="text-5xl" />
              <div>
                <h1>{userData?.name}</h1>
                <p className="text-gray">{userData?.email}</p>
              </div>
            </div>
            {filterOptions.map((option) => (
              <div
                className={`flex items-center gap-2 font-normal py-2 mb-10 cursor-pointer duration-300 hover:text-primary ${
                  optionSelected === option.title
                    ? "text-primary"
                    : "text-black"
                }`}
                onClick={() => setOptionSelected(option.title)}
                key={option.title}
              >
                {option.icon} <p className="text-lg">{option.title}</p>
              </div>
            ))}
            <div
              className="flex items-center gap-2 py-2 cursor-pointer duration-300 hover:text-primary"
              onClick={() => signOut()}
            >
              <TbLogout2 className="text-2xl" /> <p>Logout</p>
            </div>
          </div>
          <div style={{ flexBasis: "calc(100% - 500px)" }}>
            {optionSelected === "My Purchases" ? (
              <Purchases data={userData?.orders} />
            ) : optionSelected === "My Orders" ? (
              <Orders data={userData?.orders} />
            ) : (
              <EditProfile userInfo={userData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
