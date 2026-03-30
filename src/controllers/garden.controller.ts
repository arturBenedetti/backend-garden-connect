import { Request, Response, NextFunction } from "express";
import gardenRepository from "../repositories/garden.repository";
import { GardenInput } from "../dtos/garden.dto";

class GardenController {
  async getGarden(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const garden = await gardenRepository.getGarden(id);
      res.status(200).json(garden);
    } catch (error) {
      next(error);
    }
  }

  async getGardens(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await gardenRepository.getGardens();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async postGarden(req: Request, res: Response, next: NextFunction) {
    try {
      const gardenData = req.body as GardenInput;
      const result = await gardenRepository.addGarden(gardenData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchGarden(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const gardenData = req.body;
      const result = await gardenRepository.updateGarden(id, gardenData);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteGarden(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await gardenRepository.deleteGarden(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new GardenController();
