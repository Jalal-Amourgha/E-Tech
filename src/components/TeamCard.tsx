"use client";

import Image from "next/image";
import { LeadershipTeamProps } from "@/types";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";

interface TeamCardProps {
  member: LeadershipTeamProps;
  classes?: string;
}

const TeamCard = ({ member }: TeamCardProps) => {
  let socials = [
    { id: 1, icon: <FaXTwitter /> },
    { id: 1, icon: <FaInstagram /> },
    { id: 1, icon: <SlSocialFacebook /> },
    { id: 1, icon: <SlSocialLinkedin /> },
  ];
  return (
    <div key={member.name} className="w-full flex">
      <div className="mx-auto ">
        <div>
          <Image src={member.img} className="rounded-lg" alt={member.name} />
        </div>
        <h1 className="text-xl font-medium my-3">{member.name}</h1>
        <p>{member.position}</p>
        <ul className="flex flex-row items-center gap-3 mt-3 text-xl">
          {socials.map((social, index) => (
            <li className="hover:text-primary cursor-pointer" key={index}>
              {social.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;
