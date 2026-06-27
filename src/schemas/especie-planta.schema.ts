import { Schema } from "mongoose";
import { EspeciePlantaDocument } from "../entities/especie-planta.entity";

const especiePlantaSchema = new Schema<EspeciePlantaDocument>(
  {
    nome_comum: {
      type: String,
      required: true,
      maxlength: 200,
    },
    nome_cientifico: {
      type: String,
      required: true,
      maxlength: 200,
      unique: true,
    },
    tempo_colheita_dias: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

especiePlantaSchema.virtual("plantios", {
  ref: "Plantio",
  localField: "_id",
  foreignField: "especieId",
});

export default especiePlantaSchema;
