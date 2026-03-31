import { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";
import { UserInput } from "../dtos/user.dto";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const user = await userRepository.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async postUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as UserInput;
      const result = await userRepository.addUser(userData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const userData = req.body;
      const result = await userRepository.updateUser(id, userData);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await userRepository.deleteUser(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
