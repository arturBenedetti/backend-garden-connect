import mongoose from "mongoose";
import agendaSchema from "../schemas/agenda.schema";
import { AgendaDocument } from "../entities/agenda.entity";

const AgendaModel = mongoose.model<AgendaDocument>("Agenda", agendaSchema);

export default AgendaModel;
