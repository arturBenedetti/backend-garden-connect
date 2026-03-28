import mongoose from "mongoose";
import gardenSchema from "../schemas/garden.schema";
import { Garden } from "../entities/garden.entity";

const GardenModel = mongoose.model<Garden>("Garden", gardenSchema);

export default GardenModel;
