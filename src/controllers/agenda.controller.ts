import { Request, Response, NextFunction } from "express";
import agendaRepository from "../repositories/agenda.repository";
import { AgendaInput } from "../dtos/agenda.dto";

class AgendaController {
  async getAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const includeTarefa = req.query.includeTarefa === "true";
      const agenda = await agendaRepository.getAgenda(id, { includeTarefa });
      res.status(200).json(agenda);
    } catch (error) {
      next(error);
    }
  }

  async getAgendas(req: Request, res: Response, next: NextFunction) {
    try {
      const tarefaId =
        typeof req.query.tarefaId === "string" ? req.query.tarefaId : undefined;

      const filter: { tarefaId?: string } = {};
      if (tarefaId !== undefined) {
        filter.tarefaId = tarefaId;
      }

      const list = await agendaRepository.getAgendas(filter);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  async postAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as AgendaInput;
      const result = await agendaRepository.addAgenda(body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await agendaRepository.updateAgenda(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await agendaRepository.deleteAgenda(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new AgendaController();
