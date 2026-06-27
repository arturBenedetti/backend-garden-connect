import { Schema } from "mongoose";
import { CanteiroDocument } from "../entities/canteiro.entity";

const canteiroSchema = new Schema<CanteiroDocument>(
  {
    numero: {
      type: Number,
      required: true,
      min: 1,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    gardenId: {
      type: Schema.Types.ObjectId,
      ref: "Garden",
      required: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

canteiroSchema.virtual("plantios", {
  ref: "Plantio",
  localField: "_id",
  foreignField: "canteiroId",
});

canteiroSchema.index({ gardenId: 1 });
canteiroSchema.index({ gardenId: 1, numero: 1 }, { unique: true });

export default canteiroSchema;
