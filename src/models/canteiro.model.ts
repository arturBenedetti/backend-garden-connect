import mongoose from "mongoose";
import canteiroSchema from "../schemas/canteiro.schema";
import { CanteiroDocument } from "../entities/canteiro.entity";

const CanteiroModel = mongoose.model<CanteiroDocument>("Canteiro", canteiroSchema);

export default CanteiroModel;
