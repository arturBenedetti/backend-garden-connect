import EspeciePlantaModel from "../models/especie-planta.model";
import { EspeciePlantaDocument } from "../entities/especie-planta.entity";
import {
  EspeciePlantaDTO,
  EspeciePlantaInput,
  EspeciePlantaUpdateInput,
} from "../dtos/especie-planta.dto";
import mongoose from "mongoose";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../errors/http-error";
import plantioRepository from "./plantio.repository";

class EspeciePlantaRepository {
  private assertValidObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid especie planta id");
    }
  }

  async getEspeciePlanta(id: string): Promise<EspeciePlantaDocument | null> {
    this.assertValidObjectId(id);
    return EspeciePlantaModel.findById(id);
  }

  async getEspeciesPlanta(): Promise<EspeciePlantaDocument[]> {
    return EspeciePlantaModel.find();
  }

  async addEspeciePlanta(
    especiePlantaInput: EspeciePlantaInput
  ): Promise<EspeciePlantaDocument> {
    const validatedData = EspeciePlantaDTO.validate(especiePlantaInput);
    const newEspeciePlanta = new EspeciePlantaModel(validatedData);
    await newEspeciePlanta.save();
    return newEspeciePlanta;
  }

  async updateEspeciePlanta(
    id: string,
    especiePlantaData: EspeciePlantaUpdateInput
  ): Promise<EspeciePlantaDocument | null> {
    this.assertValidObjectId(id);

    const validatedData = EspeciePlantaDTO.validateUpdate(especiePlantaData);
    const especiePlanta = await EspeciePlantaModel.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );

    if (!especiePlanta) {
      throw new NotFoundError("Especie planta not found");
    }

    return especiePlanta;
  }

  async deleteEspeciePlanta(id: string): Promise<boolean> {
    this.assertValidObjectId(id);

    const especiePlanta = await EspeciePlantaModel.findById(id);
    if (!especiePlanta) {
      throw new NotFoundError("Especie planta not found");
    }

    const plantioCount = await plantioRepository.countByEspecieId(id);
    if (plantioCount > 0) {
      throw new ConflictError(
        "Não é possível eliminar espécie com plantios associados"
      );
    }

    await EspeciePlantaModel.findByIdAndDelete(id);
    return true;
  }
}

export default new EspeciePlantaRepository();
