// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const { Schema } = mongoose;

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: "admin" | "member";
//   matchPassword(enteredPassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       minlength: 3,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         "Invalid email format",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [6, "Password must be at least 6 characters"],
//     },
//     role: {
//       type: String,
//       enum: ["admin", "member"],
//       default: "member",
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword: string) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const userModel = mongoose.model<IUser>("User", userSchema);
// export default userModel;

import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      minLength: [3, "Name must be at least 3 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 character"],
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model<IUser>("User", userSchema);
export default User;
