import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";
import { User } from "../entities/user.entity";

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
