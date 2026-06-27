import { Request, Response, NextFunction } from "express";
import insumoRepository from "../repositories/insumo.repository";
import { InsumoInput } from "../dtos/insumo.dto";

class InsumoController {
  async getInsumo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const insumo = await insumoRepository.getInsumo(id);
      res.status(200).json(insumo);
    } catch (error) {
      next(error);
    }
  }

  async getInsumos(req: Request, res: Response, next: NextFunction) {
    try {
      const gardenId =
        typeof req.query.gardenId === "string" ? req.query.gardenId : undefined;
      const list = await insumoRepository.getInsumos(gardenId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postInsumo(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as InsumoInput;
      const result = await insumoRepository.addInsumo(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchInsumo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await insumoRepository.updateInsumo(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteInsumo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await insumoRepository.deleteInsumo(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new InsumoController();
