import PlantioModel from "../models/plantio.model";
import CanteiroModel from "../models/canteiro.model";
import EspeciePlantaModel from "../models/especie-planta.model";
import { PlantioDocument } from "../entities/plantio.entity";
import {
  PlantioDTO,
  PlantioInput,
  PlantioUpdateInput,
} from "../dtos/plantio.dto";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/http-error";

type GetPlantioOptions = {
  includeCanteiro?: boolean;
  includeEspecie?: boolean;
};

type GetPlantiosFilter = {
  canteiroId?: string;
  especieId?: string;
};

class PlantioRepository {
  private assertValidObjectId(id: string, label: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${label}`);
    }
  }

  private async assertCanteiroExists(canteiroId: string) {
    this.assertValidObjectId(canteiroId, "canteiro id");
    const canteiro = await CanteiroModel.findById(canteiroId);
    if (!canteiro) {
      throw new NotFoundError("Canteiro not found");
    }
  }

  private async assertEspecieExists(especieId: string) {
    this.assertValidObjectId(especieId, "especie id");
    const especie = await EspeciePlantaModel.findById(especieId);
    if (!especie) {
      throw new NotFoundError("Especie planta not found");
    }
  }

  async getPlantio(
    id: string,
    options?: GetPlantioOptions
  ): Promise<PlantioDocument | null> {
    this.assertValidObjectId(id, "plantio id");

    const query = PlantioModel.findById(id);
    if (options?.includeCanteiro) {
      query.populate("canteiroId");
    }
    if (options?.includeEspecie) {
      query.populate("especieId");
    }

    return query;
  }

  async getPlantios(filter?: GetPlantiosFilter): Promise<PlantioDocument[]> {
    const query: Record<string, string> = {};

    if (filter?.canteiroId !== undefined && filter.canteiroId !== "") {
      await this.assertCanteiroExists(filter.canteiroId);
      query.canteiroId = filter.canteiroId;
    }

    if (filter?.especieId !== undefined && filter.especieId !== "") {
      await this.assertEspecieExists(filter.especieId);
      query.especieId = filter.especieId;
    }

    return PlantioModel.find(query);
  }

  async countByEspecieId(especieId: string): Promise<number> {
    this.assertValidObjectId(especieId, "especie id");
    return PlantioModel.countDocuments({ especieId });
  }

  async addPlantio(plantioInput: PlantioInput): Promise<PlantioDocument> {
    const validatedData = PlantioDTO.validate(plantioInput);
    await this.assertCanteiroExists(validatedData.canteiroId);
    await this.assertEspecieExists(validatedData.especieId);

    const newPlantio = new PlantioModel(validatedData);
    await newPlantio.save();
    return newPlantio;
  }

  async updatePlantio(
    id: string,
    plantioData: PlantioUpdateInput
  ): Promise<PlantioDocument | null> {
    this.assertValidObjectId(id, "plantio id");

    const validatedData = PlantioDTO.validateUpdate(plantioData);
    if (validatedData.canteiroId !== undefined) {
      await this.assertCanteiroExists(validatedData.canteiroId);
    }
    if (validatedData.especieId !== undefined) {
      await this.assertEspecieExists(validatedData.especieId);
    }

    const plantio = await PlantioModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!plantio) {
      throw new NotFoundError("Plantio not found");
    }

    return plantio;
  }

  async deletePlantio(id: string): Promise<boolean> {
    this.assertValidObjectId(id, "plantio id");
    const result = await PlantioModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError("Plantio not found");
    }
    return true;
  }

  async deleteByCanteiroId(canteiroId: string): Promise<void> {
    this.assertValidObjectId(canteiroId, "canteiro id");
    await PlantioModel.deleteMany({ canteiroId });
  }

  async deleteByGardenId(gardenId: string): Promise<void> {
    this.assertValidObjectId(gardenId, "garden id");
    const canteiros = await CanteiroModel.find({ gardenId }).select("_id");
    const canteiroIds = canteiros.map((canteiro) => canteiro._id);

    if (canteiroIds.length > 0) {
      await PlantioModel.deleteMany({ canteiroId: { $in: canteiroIds } });
    }
  }
}

export default new PlantioRepository();
