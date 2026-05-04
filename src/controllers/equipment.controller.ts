import { Request, Response, NextFunction } from "express";
import equipmentRepository from "../repositories/equipment.repository";
import { EquipmentInput } from "../dtos/equipment.dto";

class EquipmentController {
  async getEquipment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const equipment = await equipmentRepository.getEquipment(id);
      res.status(200).json(equipment);
    } catch (error) {
      next(error);
    }
  }

  async getEquipments(req: Request, res: Response, next: NextFunction) {
    try {
      const gardenId =
        typeof req.query.gardenId === "string" ? req.query.gardenId : undefined;
      const list = await equipmentRepository.getEquipments(gardenId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postEquipment(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as EquipmentInput;
      const result = await equipmentRepository.addEquipment(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchEquipment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await equipmentRepository.updateEquipment(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteEquipment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await equipmentRepository.deleteEquipment(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new EquipmentController();
