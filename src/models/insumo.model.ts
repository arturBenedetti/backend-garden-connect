import mongoose from "mongoose";
import insumoSchema from "../schemas/insumo.schema";
import { InsumoDocument } from "../entities/insumo.entity";

const InsumoModel = mongoose.model<InsumoDocument>("Insumo", insumoSchema);

export default InsumoModel;
