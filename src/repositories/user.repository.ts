import UserModel from "../models/user.model";
import { UserDocument } from "../entities/user.entity";
import {
  UserDTO,
  UserInput,
  UserLoginInput,
  UserUpdateInput,
} from "../dtos/user.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/http-error";
import bcrypt from "bcryptjs";

class UserRepository {
  async getUser(id: string): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user id");
    }
    return UserModel.findById(id);
  }

  async getUsers(): Promise<UserDocument[]> {
    return UserModel.find();
  }

  async addUser(userInput: UserInput): Promise<UserDocument> {
    const validatedData = UserDTO.validate(userInput);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newUser = new UserModel(validatedData);
    newUser.password = hashedPassword;
    await newUser.save();
    return newUser;
  }

  async updateUser(
    id: string,
    userData: UserUpdateInput
  ): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user id");
    }

    const validatedData = UserDTO.validateUpdate(userData);
    if (validatedData.password) {
      validatedData.password = await bcrypt.hash(validatedData.password, 10);
    }
    const user = await UserModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user id");
    }
    const result = await UserModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("User not found");
    }
    return true;
  }

  async login(loginInput: UserLoginInput): Promise<UserDocument> {
    const validatedData = UserDTO.validateLogin(loginInput);

    const user = await UserModel.findOne({ email: validatedData.email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    if (!user.password) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(validatedData.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return user;
  }
}

export default new UserRepository();
