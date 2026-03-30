import { Schema } from "mongoose";
import { GardenDocument } from "../entities/garden.entity";

const gardenSchema = new Schema<GardenDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    localization: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default gardenSchema;
