"use client";

import AboutPage from "@/components/AboutPage";
import LeadershipTeam from "@/components/LeadershipTeam";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";
import TeamCard from "@/components/TeamCard";

const page = () => {
  return (
    <>
      <PageHeader name="About" />
      <AboutPage />
      <Statistics />
      <LeadershipTeam />
      <Services />
    </>
  );
};

export default page;
