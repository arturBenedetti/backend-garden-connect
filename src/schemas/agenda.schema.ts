import { Schema } from "mongoose";
import { AgendaDocument } from "../entities/agenda.entity";

const agendaSchema = new Schema<AgendaDocument>(
  {
    tarefaId: {
      type: Schema.Types.ObjectId,
      ref: "Tarefa",
      required: true,
    },
    data_hora: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

agendaSchema.index({ tarefaId: 1 });
agendaSchema.index({ tarefaId: 1, data_hora: 1 });
agendaSchema.index({ data_hora: 1 });

export default agendaSchema;
