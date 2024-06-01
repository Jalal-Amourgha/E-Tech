import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const infos = await User.findOne({
      email: params.id,
    }).populate("name");

    return new Response(JSON.stringify(infos), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user infos", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { type, orders, newPassword } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const userInfo = await User.findOne({
      email: params.id,
    });

    if (!userInfo) {
      return new Response("User not found", { status: 404 });
    }

    if (type === "orders") {
      userInfo.orders = [...userInfo.orders, ...orders];
    } else if (type === "password") {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userInfo.password = hashedPassword;
    }

    await userInfo.save();

    return new Response("Successfully updated the UserInfo", { status: 200 });
  } catch (error) {
    return new Response("Error Updating UserInfo", { status: 500 });
  }
};
