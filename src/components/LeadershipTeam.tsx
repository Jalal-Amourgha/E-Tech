"use client";

import { team } from "@/constants";
import SectionHeader from "./SectionHeader";
import SliderComponent from "./Slider";

const LeadershipTeam = () => {
  return (
    <div className="container my-100">
      <SectionHeader title="Leadership Team" classes="mb-10" />
      <SliderComponent
        data={team}
        dots={true}
        slidesToShow={3}
        autoplay={true}
        type="team"
      />
    </div>
  );
};

export default LeadershipTeam;
