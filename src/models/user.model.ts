import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";
import { UserDocument } from "../entities/user.entity";

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
