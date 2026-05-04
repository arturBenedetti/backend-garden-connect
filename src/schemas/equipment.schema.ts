import { Schema } from "mongoose";
import { EquipmentDocument } from "../entities/equipment.entity";

const equipmentSchema = new Schema<EquipmentDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    state: {
      type: String,
      required: true,
      maxlength: 100,
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

equipmentSchema.index({ gardenId: 1 });

export default equipmentSchema;
