import mongoose, { Document, Types } from "mongoose";

export type AgendaEntityProps = {
  _id?: Types.ObjectId;
  tarefaId: Types.ObjectId;
  data_hora: Date;
};

export class AgendaEntity {
  _id: Types.ObjectId;
  tarefaId: Types.ObjectId;
  data_hora: Date;

  constructor({ _id, tarefaId, data_hora }: AgendaEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.tarefaId = tarefaId;
    this.data_hora = data_hora;
  }

  static fromDocument(doc: Document & Partial<AgendaEntity>) {
    return new AgendaEntity({
      _id: doc._id as Types.ObjectId,
      tarefaId: (doc as any).tarefaId as Types.ObjectId,
      data_hora: new Date((doc as any).data_hora),
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      tarefaId: this.tarefaId?.toString(),
      data_hora: this.data_hora?.toISOString(),
    };
  }
}

export type AgendaDocument = Document & AgendaEntity;
