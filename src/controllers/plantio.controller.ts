import { Request, Response, NextFunction } from "express";
import plantioRepository from "../repositories/plantio.repository";
import { PlantioInput } from "../dtos/plantio.dto";

class PlantioController {
  async getPlantio(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const includeCanteiro = req.query.includeCanteiro === "true";
      const includeEspecie = req.query.includeEspecie === "true";
      const plantio = await plantioRepository.getPlantio(id, {
        includeCanteiro,
        includeEspecie,
      });
      res.status(200).json(plantio);
    } catch (error) {
      next(error);
    }
  }

  async getPlantios(req: Request, res: Response, next: NextFunction) {
    try {
      const canteiroId =
        typeof req.query.canteiroId === "string"
          ? req.query.canteiroId
          : undefined;
      const especieId =
        typeof req.query.especieId === "string" ? req.query.especieId : undefined;

      const filter: { canteiroId?: string; especieId?: string } = {};
      if (canteiroId !== undefined) {
        filter.canteiroId = canteiroId;
      }
      if (especieId !== undefined) {
        filter.especieId = especieId;
      }

      const list = await plantioRepository.getPlantios(filter);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postPlantio(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as PlantioInput;
      const result = await plantioRepository.addPlantio(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchPlantio(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await plantioRepository.updatePlantio(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deletePlantio(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await plantioRepository.deletePlantio(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new PlantioController();
