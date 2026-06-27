import mongoose from "mongoose";
import especiePlantaSchema from "../schemas/especie-planta.schema";
import { EspeciePlantaDocument } from "../entities/especie-planta.entity";

const EspeciePlantaModel = mongoose.model<EspeciePlantaDocument>(
  "EspeciePlanta",
  especiePlantaSchema
);

export default EspeciePlantaModel;
