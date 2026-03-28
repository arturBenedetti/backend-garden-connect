import { Schema } from "mongoose";
import { Garden } from "../entities/garden.entity";

const gardenSchema = new Schema<Garden>(
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
