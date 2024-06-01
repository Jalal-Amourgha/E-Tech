"use client";

import { handIcon } from "@/assets/icons";
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        console.log("allo");
        router.push("/profile");
      }
    } catch (error) {
      console.log("Password or Email is not Correct!");
    }
  };
  return (
    <div
      className={
        "flex flex-col justify-start md:justify-center items-center h-full w-full md:bg-white p-2 md:p-0"
      }
    >
      <div
        className={
          "max-w-[600px] w-full p-7 md:p-12 rounded-md form__container"
        }
      >
        <div className={"flex items-center gap-4 w-full"}>
          <h1 className="text-3xl font-medium">Welcome Back</h1>
          <Image src={handIcon} alt="hand" width={30} height={30} />
        </div>
        <p className="text-lg text-gray mb-7">Please Login here</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <TextField
              required
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <TextField
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary p-3 rounded-lg text-white text-xl font-normal "
          >
            Log in
          </button>
        </form>

        <p className="text-xl mt-10 text-gray text-center">
          Don't have an Account yet?{" "}
          <Link href="/signup" className="hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
