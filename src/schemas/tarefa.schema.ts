import { Schema } from "mongoose";
import {
  TAREFA_PRIORIDADE,
  TAREFA_STATUS,
  TarefaDocument,
} from "../entities/tarefa.entity";

const tarefaSchema = new Schema<TarefaDocument>(
  {
    descricao: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    prioridade: {
      type: String,
      required: true,
      enum: TAREFA_PRIORIDADE,
    },
    status: {
      type: String,
      required: true,
      enum: TAREFA_STATUS,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canteiroId: {
      type: Schema.Types.ObjectId,
      ref: "Canteiro",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

tarefaSchema.index({ userId: 1 });
tarefaSchema.index({ canteiroId: 1 });
tarefaSchema.index({ userId: 1, status: 1 });
tarefaSchema.index({ canteiroId: 1, status: 1 });

export default tarefaSchema;
