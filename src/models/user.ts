import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
    },
    orders: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
