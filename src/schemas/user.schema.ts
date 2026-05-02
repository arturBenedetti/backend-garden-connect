import { Schema } from "mongoose";
import { UserDocument } from "../entities/user.entity";

const userSchema = new Schema<UserDocument>(
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
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
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
    toJSON: {
      transform: (_doc, ret) => {
        const { password, ...sanitized } = ret as Record<string, unknown>;
        return sanitized;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        const { password, ...sanitized } = ret as Record<string, unknown>;
        return sanitized;
      },
    },
  }
);

export default userSchema;
