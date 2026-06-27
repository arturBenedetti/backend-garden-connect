import { Request, Response, NextFunction } from "express";
import canteiroRepository from "../repositories/canteiro.repository";
import plantioRepository from "../repositories/plantio.repository";
import tarefaRepository from "../repositories/tarefa.repository";
import { CanteiroInput } from "../dtos/canteiro.dto";
import { NotFoundError } from "../errors/http-error";

class CanteiroController {
  async getCanteiro(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const canteiro = await canteiroRepository.getCanteiro(id);
      res.status(200).json(canteiro);
    } catch (error) {
      next(error);
    }
  }

  async getCanteiroPlantios(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const canteiro = await canteiroRepository.getCanteiro(id);
      if (!canteiro) {
        throw new NotFoundError("Canteiro not found");
      }

      const plantios = await plantioRepository.getPlantios({ canteiroId: id });
      res.status(200).json(plantios);
    } catch (error) {
      next(error);
    }
  }

  async getCanteiroTarefas(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const canteiro = await canteiroRepository.getCanteiro(id);
      if (!canteiro) {
        throw new NotFoundError("Canteiro not found");
      }

      const tarefas = await tarefaRepository.getTarefas({ canteiroId: id });
      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
  }

  async getCanteiros(req: Request, res: Response, next: NextFunction) {
    try {
      const gardenId =
        typeof req.query.gardenId === "string" ? req.query.gardenId : undefined;
      const list = await canteiroRepository.getCanteiros(gardenId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postCanteiro(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CanteiroInput;
      const result = await canteiroRepository.addCanteiro(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchCanteiro(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await canteiroRepository.updateCanteiro(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCanteiro(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await canteiroRepository.deleteCanteiro(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new CanteiroController();
