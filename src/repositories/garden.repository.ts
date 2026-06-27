import GardenModel from "../models/garden.model";
import { GardenDocument } from "../entities/garden.entity";
import {
  GardenDTO,
  GardenInput,
  GardenUpdateInput,
} from "../dtos/garden.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";
import equipmentRepository from "./equipment.repository";
import canteiroRepository from "./canteiro.repository";

type GetGardenOptions = {
  includeEquipments?: boolean;
  includeCanteiros?: boolean;
};

class GardenRepository {
  private assertValidObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid garden id");
    }
  }

  async getGarden(
    id: string,
    options?: GetGardenOptions
  ): Promise<GardenDocument | null> {
    this.assertValidObjectId(id);

    const query = GardenModel.findById(id);
    if (options?.includeEquipments) {
      query.populate("equipments");
    }
    if (options?.includeCanteiros) {
      query.populate("canteiros");
    }

    return query;
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
    this.assertValidObjectId(id);

    const validatedData = GardenDTO.validateUpdate(gardenData);
    const garden = await GardenModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!garden) {
      throw new NotFoundError("Garden not found");
    }

    return garden;
  }

  async deleteGarden(id: string): Promise<boolean> {
    this.assertValidObjectId(id);

    const garden = await GardenModel.findById(id);
    if (!garden) {
      throw new NotFoundError("Garden not found");
    }

    await equipmentRepository.deleteByGardenId(id);
    await canteiroRepository.deleteByGardenId(id);
    await GardenModel.findByIdAndDelete(id);
    return true;
  }
}

export default new GardenRepository();
