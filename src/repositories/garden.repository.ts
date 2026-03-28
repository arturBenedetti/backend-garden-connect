import GardenModel from "../models/garden.model";
import { Garden } from "../entities/garden.entity";
import {
  gardenSchema,
  GardenUpdateSchema,
  GardenInput,
  GardenUpdateInput,
} from "../dtos/garden.dto";
import mongoose from "mongoose";

async function getGarden(id: string): Promise<Garden | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid garden id");
    }
    const garden = await GardenModel.findById(id);
    return garden;
  } catch (error) {
    throw error;
  }
}

async function getGardens(): Promise<Garden[]> {
  try {
    const gardens = await GardenModel.find();
    return gardens;
  } catch (error) {
    throw error;
  }
}

async function addGarden(gardenInput: GardenInput): Promise<Garden> {
  try {
    const validatedData = gardenSchema.parse(gardenInput);
    const newGarden = new GardenModel(validatedData);
    await newGarden.save();
    return newGarden;
  } catch (error) {
    throw error;
  }
}

async function updateGarden(
  id: string,
  gardenData: GardenUpdateInput
): Promise<Garden | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid garden id");
    }
    const validatedData = GardenUpdateSchema.parse(gardenData);
    const garden = await GardenModel.findByIdAndUpdate(id, validatedData, { new: true });

    if (!garden) {
      throw new Error("Garden not found");
    }

    return garden;
  } catch (error) {
    throw error;
  }
}

async function deleteGarden(id: string): Promise<boolean> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid garden id");
    }
    const result = await GardenModel.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    throw error;
  }
}

export default {
  getGarden,
  getGardens,
  addGarden,
  updateGarden,
  deleteGarden,
};
