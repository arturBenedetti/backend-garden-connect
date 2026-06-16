import InsumoModel from "../models/insumo.model";
import GardenModel from "../models/garden.model";
import { InsumoDocument } from "../entities/insumo.entity";
import {
  InsumoDTO,
  InsumoInput,
  InsumoUpdateInput,
} from "../dtos/insumo.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";

class InsumoRepository {
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

  async getInsumo(id: string): Promise<InsumoDocument | null> {
    this.assertValidObjectId(id, "insumo id");
    return InsumoModel.findById(id);
  }

  async getInsumos(gardenId?: string): Promise<InsumoDocument[]> {
    if (gardenId !== undefined && gardenId !== "") {
      this.assertValidObjectId(gardenId, "garden id");
      return InsumoModel.find({ gardenId });
    }
    return InsumoModel.find();
  }

  async addInsumo(insumoInput: InsumoInput): Promise<InsumoDocument> {
    const validatedData = InsumoDTO.validate(insumoInput);
    await this.assertGardenExists(validatedData.gardenId);
    const newInsumo = new InsumoModel(validatedData);
    await newInsumo.save();
    return newInsumo;
  }

  async updateInsumo(
    id: string,
    insumoData: InsumoUpdateInput
  ): Promise<InsumoDocument | null> {
    this.assertValidObjectId(id, "insumo id");

    const validatedData = InsumoDTO.validateUpdate(insumoData);
    if (validatedData.gardenId !== undefined) {
      await this.assertGardenExists(validatedData.gardenId);
    }

    const insumo = await InsumoModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!insumo) {
      throw new NotFoundError("Insumo not found");
    }

    return insumo;
  }

  async deleteInsumo(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "insumo id");
    const result = await InsumoModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("Insumo not found");
    }
    return true;
  }
}

export default new InsumoRepository();
