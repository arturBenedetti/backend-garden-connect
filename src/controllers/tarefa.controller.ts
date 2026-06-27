import { Request, Response, NextFunction } from "express";
import tarefaRepository from "../repositories/tarefa.repository";
import agendaRepository from "../repositories/agenda.repository";
import { NotFoundError } from "../errors/http-error";
import { TarefaInput } from "../dtos/tarefa.dto";

class TarefaController {
  async getTarefa(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const includeUser = req.query.includeUser === "true";
      const includeCanteiro = req.query.includeCanteiro === "true";
      const tarefa = await tarefaRepository.getTarefa(id, {
        includeUser,
        includeCanteiro,
      });
      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
  }

  async getTarefaAgendas(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const tarefa = await tarefaRepository.getTarefa(id);
      if (!tarefa) {
        throw new NotFoundError("Tarefa not found");
      }

      const agendas = await agendaRepository.getAgendas({ tarefaId: id });
      res.status(200).json(agendas);
    } catch (error) {
      next(error);
    }
  }

  async getTarefas(req: Request, res: Response, next: NextFunction) {
    try {
      const userId =
        typeof req.query.userId === "string" ? req.query.userId : undefined;
      const canteiroId =
        typeof req.query.canteiroId === "string"
          ? req.query.canteiroId
          : undefined;

      const filter: { userId?: string; canteiroId?: string } = {};
      if (userId !== undefined) {
        filter.userId = userId;
      }
      if (canteiroId !== undefined) {
        filter.canteiroId = canteiroId;
      }

      const list = await tarefaRepository.getTarefas(filter);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postTarefa(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as TarefaInput;
      const result = await tarefaRepository.addTarefa(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchTarefa(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await tarefaRepository.updateTarefa(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteTarefa(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await tarefaRepository.deleteTarefa(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new TarefaController();
