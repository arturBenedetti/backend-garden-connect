import AgendaModel from "../models/agenda.model";
import TarefaModel from "../models/tarefa.model";
import { AgendaDocument } from "../entities/agenda.entity";
import {
  AgendaDTO,
  AgendaInput,
  AgendaUpdateInput,
} from "../dtos/agenda.dto";
import mongoose, { Types } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";

type GetAgendaOptions = {
  includeTarefa?: boolean;
};

type GetAgendasFilter = {
  tarefaId?: string;
};

class AgendaRepository {
  private assertValidObjectId(id: string, label: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${label}`);
    }
  }

  private async assertTarefaExists(tarefaId: string) {
    this.assertValidObjectId(tarefaId, "tarefa id");
    const tarefa = await TarefaModel.findById(tarefaId);
    if (!tarefa) {
      throw new NotFoundError("Tarefa not found");
    }
  }

  async getAgenda(
    id: string,
    options?: GetAgendaOptions
  ): Promise<AgendaDocument | null> {
    this.assertValidObjectId(id, "agenda id");

    const query = AgendaModel.findById(id);
    if (options?.includeTarefa) {
      query.populate("tarefaId");
    }

    return query;
  }

  async getAgendas(filter?: GetAgendasFilter): Promise<AgendaDocument[]> {
    const query: Record<string, string> = {};

    if (filter?.tarefaId !== undefined && filter.tarefaId !== "") {
      await this.assertTarefaExists(filter.tarefaId);
      query.tarefaId = filter.tarefaId;
    }

    return AgendaModel.find(query).sort({ data_hora: 1 });
  }

  async addAgenda(agendaInput: AgendaInput): Promise<AgendaDocument> {
    const validatedData = AgendaDTO.validate(agendaInput);
    await this.assertTarefaExists(validatedData.tarefaId);

    const newAgenda = new AgendaModel(validatedData);
    await newAgenda.save();
    return newAgenda;
  }

  async updateAgenda(
    id: string,
    agendaData: AgendaUpdateInput
  ): Promise<AgendaDocument | null> {
    this.assertValidObjectId(id, "agenda id");

    const validatedData = AgendaDTO.validateUpdate(agendaData);
    if (validatedData.tarefaId !== undefined) {
      await this.assertTarefaExists(validatedData.tarefaId);
    }

    const agenda = await AgendaModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!agenda) {
      throw new NotFoundError("Agenda not found");
    }

    return agenda;
  }

  async deleteAgenda(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "agenda id");
    const result = await AgendaModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("Agenda not found");
    }
    return true;
  }

  async deleteByTarefaId(tarefaId: string): Promise<void> {
    this.assertValidObjectId(tarefaId, "tarefa id");
    await AgendaModel.deleteMany({ tarefaId });
  }

  async deleteByTarefaIds(tarefaIds: Types.ObjectId[]): Promise<void> {
    if (tarefaIds.length === 0) {
      return;
    }
    await AgendaModel.deleteMany({ tarefaId: { $in: tarefaIds } });
  }
}

export default new AgendaRepository();
