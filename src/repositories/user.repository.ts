import UserModel from "../models/user.model";
import { UserDocument } from "../entities/user.entity";
import {
  UserDTO,
  UserInput,
  UserUpdateInput,
} from "../dtos/user.dto";
import mongoose from "mongoose";

class UserRepository {
  async getUser(id: string): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }
    return UserModel.findById(id);
  }

  async getUsers(): Promise<UserDocument[]> {
    return UserModel.find();
  }

  async addUser(userInput: UserInput): Promise<UserDocument> {
    const validatedData = UserDTO.validate(userInput);
    const newUser = new UserModel(validatedData);
    await newUser.save();
    return newUser;
  }

  async updateUser(
    id: string,
    userData: UserUpdateInput
  ): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }

    const validatedData = UserDTO.validateUpdate(userData);
    const user = await UserModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new UserRepository();
