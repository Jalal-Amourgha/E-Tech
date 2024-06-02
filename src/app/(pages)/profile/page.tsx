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
import { IoBagCheckOutline } from "react-icons/io5";
import { UserDataProps } from "@/types";
import PaymentDetails from "@/components/PaymentDetails";

let filterOptions = [
  {
    id: 1,
    icon: <FaRegUser className="text-2xl" />,
    title: "Personal Information",
  },
  {
    id: 2,
    icon: <IoBagCheckOutline className="text-2xl" />,
    title: "My Purchases",
  },
  {
    id: 3,
    icon: <FaRegCreditCard className="text-2xl" />,
    title: "My Payemnt Details",
  },
  { id: 4, icon: <BsBoxSeam className="text-2xl" />, title: "My Orders" },
];

const MyProfile = () => {
  const [optionSelected, setOptionSelected] = useState<number>(1);
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
        <div className="flex flex-col md:flex-row">
          <div className="md:basis-[400px]">
            <div className="flex items-center gap-5 mb-8">
              <FaRegCircleUser className="text-5xl" />
              <div>
                <h1>{userData?.name}</h1>
                <p className="text-gray">{userData?.email}</p>
              </div>
            </div>
            {filterOptions.map((option, index) => (
              <div
                className={`flex items-center gap-2 font-normal py-2 mb-10 cursor-pointer duration-300 hover:text-primary ${
                  optionSelected === option.id ? "text-primary" : "text-black"
                }`}
                onClick={() => setOptionSelected(option.id)}
                key={index}
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
          <div style={{ flexBasis: "calc(100% - 400px)" }}>
            {optionSelected === 2 ? (
              <Purchases data={userData?.orders} />
            ) : optionSelected === 3 ? (
              <PaymentDetails paymentDetails={userData?.paymentDetails} />
            ) : optionSelected === 4 ? (
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
