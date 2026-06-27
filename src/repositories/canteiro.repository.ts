import CanteiroModel from "../models/canteiro.model";
import GardenModel from "../models/garden.model";
import { CanteiroDocument } from "../entities/canteiro.entity";
import {
  CanteiroDTO,
  CanteiroInput,
  CanteiroUpdateInput,
} from "../dtos/canteiro.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";
import plantioRepository from "./plantio.repository";
import tarefaRepository from "./tarefa.repository";

class CanteiroRepository {
  private assertValidObjectId(id: string, label: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${label}`);
    }
  }

  private async assertGardenExists(gardenId: string) {
    this.assertValidObjectId(gardenId, "garden id");
    const garden = await GardenModel.findById(gardenId);
    if (!garden) {
      throw new NotFoundError("Garden not found");
    }
  }

  async getCanteiro(id: string): Promise<CanteiroDocument | null> {
    this.assertValidObjectId(id, "canteiro id");
    return CanteiroModel.findById(id);
  }

  async getCanteiros(gardenId?: string): Promise<CanteiroDocument[]> {
    if (gardenId !== undefined && gardenId !== "") {
      this.assertValidObjectId(gardenId, "garden id");
      await this.assertGardenExists(gardenId);
      return CanteiroModel.find({ gardenId });
    }
    return CanteiroModel.find();
  }

  async addCanteiro(canteiroInput: CanteiroInput): Promise<CanteiroDocument> {
    const validatedData = CanteiroDTO.validate(canteiroInput);
    await this.assertGardenExists(validatedData.gardenId);
    const newCanteiro = new CanteiroModel(validatedData);
    await newCanteiro.save();
    return newCanteiro;
  }

  async updateCanteiro(
    id: string,
    canteiroData: CanteiroUpdateInput
  ): Promise<CanteiroDocument | null> {
    this.assertValidObjectId(id, "canteiro id");

    const validatedData = CanteiroDTO.validateUpdate(canteiroData);
    if (validatedData.gardenId !== undefined) {
      await this.assertGardenExists(validatedData.gardenId);
    }

    const canteiro = await CanteiroModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!canteiro) {
      throw new NotFoundError("Canteiro not found");
    }

    return canteiro;
  }

  async deleteCanteiro(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "canteiro id");
    const canteiro = await CanteiroModel.findById(id);
    if (!canteiro) {
      throw new NotFoundError("Canteiro not found");
    }

    await plantioRepository.deleteByCanteiroId(id);
    await tarefaRepository.deleteByCanteiroId(id);
    await CanteiroModel.findByIdAndDelete(id);
    return true;
  }

  async deleteByGardenId(gardenId: string): Promise<void> {
    this.assertValidObjectId(gardenId, "garden id");
    await plantioRepository.deleteByGardenId(gardenId);
    await tarefaRepository.deleteByGardenId(gardenId);
    await CanteiroModel.deleteMany({ gardenId });
  }
}

export default new CanteiroRepository();
