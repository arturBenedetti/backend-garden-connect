import { Request, Response, NextFunction } from "express";
import gardenRepository from "../repositories/garden.repository";
import { GardenInput } from "../dtos/garden.dto";

async function getGarden(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const garden = await gardenRepository.getGarden(id);
    if (garden) res.status(200).json(garden);
    else res.status(404).json({ error: "Garden not found" });
  } catch (error) {
    next(error);
  }
}

async function getGardens(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await gardenRepository.getGardens();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function postGarden(req: Request, res: Response, next: NextFunction) {
  try {
    const gardenData = req.body as GardenInput;
    const result = await gardenRepository.addGarden(gardenData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function patchGarden(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const gardenData = req.body;
    const result = await gardenRepository.updateGarden(id, gardenData);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteGarden(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const result = await gardenRepository.deleteGarden(id);
    if (result) res.sendStatus(204);
    else res.status(404).json({ error: "Garden not found" });
  } catch (error) {
    next(error);
  }
}

export default {
  getGarden,
  getGardens,
  postGarden,
  patchGarden,
  deleteGarden,
};
