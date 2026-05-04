import EquipmentModel from "../models/equipment.model";
import GardenModel from "../models/garden.model";
import { EquipmentDocument } from "../entities/equipment.entity";
import {
  EquipmentDTO,
  EquipmentInput,
  EquipmentUpdateInput,
} from "../dtos/equipment.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";

class EquipmentRepository {
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

  async getEquipment(id: string): Promise<EquipmentDocument | null> {
    this.assertValidObjectId(id, "equipment id");
    return EquipmentModel.findById(id);
  }

  async getEquipments(gardenId?: string): Promise<EquipmentDocument[]> {
    if (gardenId !== undefined && gardenId !== "") {
      this.assertValidObjectId(gardenId, "garden id");
      return EquipmentModel.find({ gardenId });
    }
    return EquipmentModel.find();
  }

  async addEquipment(equipmentInput: EquipmentInput): Promise<EquipmentDocument> {
    const validatedData = EquipmentDTO.validate(equipmentInput);
    await this.assertGardenExists(validatedData.gardenId);
    const newEquipment = new EquipmentModel(validatedData);
    await newEquipment.save();
    return newEquipment;
  }

  async updateEquipment(
    id: string,
    equipmentData: EquipmentUpdateInput
  ): Promise<EquipmentDocument | null> {
    this.assertValidObjectId(id, "equipment id");

    const validatedData = EquipmentDTO.validateUpdate(equipmentData);
    if (validatedData.gardenId !== undefined) {
      await this.assertGardenExists(validatedData.gardenId);
    }

    const equipment = await EquipmentModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!equipment) {
      throw new NotFoundError("Equipment not found");
    }

    return equipment;
  }

  async deleteEquipment(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "equipment id");
    const result = await EquipmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("Equipment not found");
    }
    return true;
  }
}

export default new EquipmentRepository();
