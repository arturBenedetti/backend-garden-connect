import { Schema } from "mongoose";
import { InsumoDocument } from "../entities/insumo.entity";

const insumoSchema = new Schema<InsumoDocument>(
  {
    nome: {
      type: String,
      required: true,
      maxlength: 200,
    },
    quantidade: {
      type: Number,
      required: true,
      min: 0,
    },
    unidade: {
      type: String,
      required: true,
      maxlength: 50,
    },
    gardenId: {
      type: Schema.Types.ObjectId,
      ref: "Garden",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

insumoSchema.index({ gardenId: 1 });

export default insumoSchema;
