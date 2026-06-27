import mongoose from "mongoose";
import tarefaSchema from "../schemas/tarefa.schema";
import { TarefaDocument } from "../entities/tarefa.entity";

const TarefaModel = mongoose.model<TarefaDocument>("Tarefa", tarefaSchema);

export default TarefaModel;
