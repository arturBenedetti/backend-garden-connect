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
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gardenSchema.virtual("equipments", {
  ref: "Equipment",
  localField: "_id",
  foreignField: "gardenId",
});

gardenSchema.virtual("canteiros", {
  ref: "Canteiro",
  localField: "_id",
  foreignField: "gardenId",
});

export default gardenSchema;
