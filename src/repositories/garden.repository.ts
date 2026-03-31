import GardenModel from "../models/garden.model";
import { GardenDocument } from "../entities/garden.entity";
import {
  GardenDTO,
  GardenInput,
  GardenUpdateInput,
} from "../dtos/garden.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";

class GardenRepository {
  async getGarden(id: string): Promise<GardenDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid garden id");
    }
    return GardenModel.findById(id);
  }

  async getGardens(): Promise<GardenDocument[]> {
    return GardenModel.find();
  }

  async addGarden(gardenInput: GardenInput): Promise<GardenDocument> {
    const validatedData = GardenDTO.validate(gardenInput);
    const newGarden = new GardenModel(validatedData);
    await newGarden.save();
    return newGarden;
  }

  async updateGarden(
    id: string,
    gardenData: GardenUpdateInput
  ): Promise<GardenDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid garden id");
    }

    const validatedData = GardenDTO.validateUpdate(gardenData);
    const garden = await GardenModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!garden) {
      throw new NotFoundError("Garden not found");
    }

    return garden;
  }

  async deleteGarden(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid garden id");
    }
    const result = await GardenModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("Garden not found");
    }
    return true;
  }
}

export default new GardenRepository();
