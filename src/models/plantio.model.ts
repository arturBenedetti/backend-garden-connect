import mongoose from "mongoose";
import plantioSchema from "../schemas/plantio.schema";
import { PlantioDocument } from "../entities/plantio.entity";

const PlantioModel = mongoose.model<PlantioDocument>("Plantio", plantioSchema);

export default PlantioModel;
