"use client";

import { handIcon } from "@/assets/icons";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return console.log("wrong pass");
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        console.log("saaalam");
        // route.push("/profile");
      } else {
        console.log("This email is already taken");
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="text-3xl font-medium mb-3">Create an account</h1>
          <Image src={handIcon} alt="hand" width={30} height={30} />
        </div>
        <p className="text-lg text-gray mb-7">Enter your details below</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <TextField
              required
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              size="medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-5">
            <TextField
              required
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth={true}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary p-3 rounded-lg text-white text-xl font-normal "
          >
            Create Account
          </button>
        </form>

        <p className="text-xl mt-10 text-gray text-center">
          Already Have an Account?{" "}
          <Link href="/login" className="hover:text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
