"use client";

import { UserDataProps } from "@/types";
import { useState } from "react";

const EditProfile = ({ userInfo }: { userInfo?: UserDataProps }) => {
  const [name, setName] = useState<string>(userInfo?.name as string);
  const [email, setEmail] = useState<string>(userInfo?.email as string);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !newPassword || !confirmNewPassword) {
      return alert("Pleadse Fill All the Inputs");
    }

    if (newPassword !== confirmNewPassword) {
      return alert("Passwords are not matched");
    }

    try {
      const response = await fetch(`/api/user/${userInfo?.email}/infos`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "password",
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        console.log("jalalalalal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-primary mb-5">Edit your Profile</h1>
      <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
        <div>
          <p className="mb-3">Name</p>
          <input
            type="text"
            className="bg-bg-color text-lg p-2 rounded-lg w-full"
            placeholder={`${userInfo?.name}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p className="mb-3">Email</p>
          <input
            type="text"
            className="bg-bg-color text-lg p-2 rounded-lg w-full"
            placeholder={`${userInfo?.email}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p className="mb-3">Password Changes</p>

          <input
            type="password"
            className="bg-bg-color text-lg p-2 rounded-lg w-full mb-5"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="bg-bg-color text-lg p-2 rounded-lg w-full "
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="bg-primary text-white text-lg p-3 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
