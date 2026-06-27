import { Schema } from "mongoose";
import {
  PLANTIO_STATUS,
  PlantioDocument,
} from "../entities/plantio.entity";

const plantioSchema = new Schema<PlantioDocument>(
  {
    canteiroId: {
      type: Schema.Types.ObjectId,
      ref: "Canteiro",
      required: true,
    },
    especieId: {
      type: Schema.Types.ObjectId,
      ref: "EspeciePlanta",
      required: true,
    },
    data_inicio: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: PLANTIO_STATUS,
    },
  },
  {
    versionKey: false,
  }
);

plantioSchema.index({ canteiroId: 1 });
plantioSchema.index({ especieId: 1 });
plantioSchema.index({ canteiroId: 1, status: 1 });

export default plantioSchema;
