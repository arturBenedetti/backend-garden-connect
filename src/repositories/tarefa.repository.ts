import TarefaModel from "../models/tarefa.model";
import UserModel from "../models/user.model";
import CanteiroModel from "../models/canteiro.model";
import { TarefaDocument } from "../entities/tarefa.entity";
import {
  TarefaDTO,
  TarefaInput,
  TarefaUpdateInput,
} from "../dtos/tarefa.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";
import agendaRepository from "./agenda.repository";

type GetTarefaOptions = {
  includeUser?: boolean;
  includeCanteiro?: boolean;
};

type GetTarefasFilter = {
  userId?: string;
  canteiroId?: string;
};

class TarefaRepository {
  private assertValidObjectId(id: string, label: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${label}`);
    }
  }

  private async assertUserExists(userId: string) {
    this.assertValidObjectId(userId, "user id");
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
  }

  private async assertCanteiroExists(canteiroId: string) {
    this.assertValidObjectId(canteiroId, "canteiro id");
    const canteiro = await CanteiroModel.findById(canteiroId);
    if (!canteiro) {
      throw new NotFoundError("Canteiro not found");
    }
  }

  async getTarefa(
    id: string,
    options?: GetTarefaOptions
  ): Promise<TarefaDocument | null> {
    this.assertValidObjectId(id, "tarefa id");

    const query = TarefaModel.findById(id);
    if (options?.includeUser) {
      query.populate("userId", "-password");
    }
    if (options?.includeCanteiro) {
      query.populate("canteiroId");
    }

    return query;
  }

  async getTarefas(filter?: GetTarefasFilter): Promise<TarefaDocument[]> {
    const query: Record<string, string> = {};

    if (filter?.userId !== undefined && filter.userId !== "") {
      await this.assertUserExists(filter.userId);
      query.userId = filter.userId;
    }

    if (filter?.canteiroId !== undefined && filter.canteiroId !== "") {
      await this.assertCanteiroExists(filter.canteiroId);
      query.canteiroId = filter.canteiroId;
    }

    return TarefaModel.find(query);
  }

  async addTarefa(tarefaInput: TarefaInput): Promise<TarefaDocument> {
    const validatedData = TarefaDTO.validate(tarefaInput);
    await this.assertUserExists(validatedData.userId);
    await this.assertCanteiroExists(validatedData.canteiroId);

    const newTarefa = new TarefaModel(validatedData);
    await newTarefa.save();
    return newTarefa;
  }

  async updateTarefa(
    id: string,
    tarefaData: TarefaUpdateInput
  ): Promise<TarefaDocument | null> {
    this.assertValidObjectId(id, "tarefa id");

    const validatedData = TarefaDTO.validateUpdate(tarefaData);
    if (validatedData.userId !== undefined) {
      await this.assertUserExists(validatedData.userId);
    }
    if (validatedData.canteiroId !== undefined) {
      await this.assertCanteiroExists(validatedData.canteiroId);
    }

    const tarefa = await TarefaModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!tarefa) {
      throw new NotFoundError("Tarefa not found");
    }

    return tarefa;
  }

  async deleteTarefa(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "tarefa id");
    const result = await TarefaModel.findById(id);
    if (!result) {
      throw new NotFoundError("Tarefa not found");
    }

    await agendaRepository.deleteByTarefaId(id);
    await TarefaModel.findByIdAndDelete(id);
    return true;
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.assertValidObjectId(userId, "user id");
    const tarefas = await TarefaModel.find({ userId }).select("_id");
    const tarefaIds = tarefas.map((tarefa) => tarefa._id);
    await agendaRepository.deleteByTarefaIds(tarefaIds);
    await TarefaModel.deleteMany({ userId });
  }

  async deleteByCanteiroId(canteiroId: string): Promise<void> {
    this.assertValidObjectId(canteiroId, "canteiro id");
    const tarefas = await TarefaModel.find({ canteiroId }).select("_id");
    const tarefaIds = tarefas.map((tarefa) => tarefa._id);
    await agendaRepository.deleteByTarefaIds(tarefaIds);
    await TarefaModel.deleteMany({ canteiroId });
  }

  async deleteByGardenId(gardenId: string): Promise<void> {
    this.assertValidObjectId(gardenId, "garden id");
    const canteiros = await CanteiroModel.find({ gardenId }).select("_id");
    const canteiroIds = canteiros.map((canteiro) => canteiro._id);

    if (canteiroIds.length > 0) {
      const tarefas = await TarefaModel.find({
        canteiroId: { $in: canteiroIds },
      }).select("_id");
      const tarefaIds = tarefas.map((tarefa) => tarefa._id);
      await agendaRepository.deleteByTarefaIds(tarefaIds);
      await TarefaModel.deleteMany({ canteiroId: { $in: canteiroIds } });
    }
  }
}

export default new TarefaRepository();
