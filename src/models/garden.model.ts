import mongoose from "mongoose";
import gardenSchema from "../schemas/garden.schema";
import { GardenDocument } from "../entities/garden.entity";

const GardenModel = mongoose.model<GardenDocument>("Garden", gardenSchema);

export default GardenModel;
