import mongoose from "mongoose";
import equipmentSchema from "../schemas/equipment.schema";
import { EquipmentDocument } from "../entities/equipment.entity";

const EquipmentModel = mongoose.model<EquipmentDocument>(
  "Equipment",
  equipmentSchema
);

export default EquipmentModel;
