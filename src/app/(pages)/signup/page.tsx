import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Generated by create next app",
};

const page = () => {
  return (
    <section className="bg-signup-bg md:bg-none grid grid-cols-[1fr] md:grid-cols-[1fr_45%] h-screen overflow-auto ">
      <div
        className={
          "h-full w-full bg-none flex justify-center md:block md:bg-signup-bg bg-cover bg-no-repeat bg-center"
        }
      ></div>
      <RegisterForm />
    </section>
  );
};

export default page;
