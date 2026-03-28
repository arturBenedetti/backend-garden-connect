import UserModel from "../models/user.model";
import { User } from "../entities/user.entity";
import {
  userSchema,
  userUpdateSchema,
  UserInput,
  UserUpdateInput,
} from "../dtos/user.dto";
import mongoose from "mongoose";

async function getUser(id: string): Promise<User | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUsers(): Promise<User[]> {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw error;
  }
}

async function addUser(userInput: UserInput): Promise<User> {
  try {
    const validatedData = userSchema.parse(userInput);
    const newUser = new UserModel(validatedData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function updateUser(
  id: string,
  userData: UserUpdateInput
): Promise<User | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }
    const validatedData = userUpdateSchema.parse(userData);
    const user = await UserModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id: string): Promise<boolean> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id");
    }
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    throw error;
  }
}

export default {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
