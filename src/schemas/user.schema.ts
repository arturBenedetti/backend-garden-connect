import { Schema } from "mongoose";
import { User } from "../entities/user.entity";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
  }
);

export default userSchema;
