import { Request, Response, NextFunction } from "express";
import especiePlantaRepository from "../repositories/especie-planta.repository";
import plantioRepository from "../repositories/plantio.repository";
import { EspeciePlantaInput } from "../dtos/especie-planta.dto";
import { NotFoundError } from "../errors/http-error";

class EspeciePlantaController {
  async getEspeciePlanta(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const especiePlanta = await especiePlantaRepository.getEspeciePlanta(id);
      res.status(200).json(especiePlanta);
    } catch (error) {
      next(error);
    }
  }

  async getEspeciePlantaPlantios(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = String(req.params.id);
      const especiePlanta = await especiePlantaRepository.getEspeciePlanta(id);
      if (!especiePlanta) {
        throw new NotFoundError("Especie planta not found");
      }

      const plantios = await plantioRepository.getPlantios({ especieId: id });
      res.status(200).json(plantios);
    } catch (error) {
      next(error);
    }
  }

  async getEspeciesPlanta(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await especiePlantaRepository.getEspeciesPlanta();
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postEspeciePlanta(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as EspeciePlantaInput;
      const result = await especiePlantaRepository.addEspeciePlanta(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchEspeciePlanta(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await especiePlantaRepository.updateEspeciePlanta(
        id,
        req.body
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteEspeciePlanta(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await especiePlantaRepository.deleteEspeciePlanta(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new EspeciePlantaController();
