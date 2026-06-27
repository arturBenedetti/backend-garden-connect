import mongoose, { Document, Types } from "mongoose";

export const TAREFA_PRIORIDADE = ["baixa", "media", "alta"] as const;
export type TarefaPrioridade = (typeof TAREFA_PRIORIDADE)[number];

export const TAREFA_STATUS = [
  "pendente",
  "em_andamento",
  "concluida",
  "cancelada",
] as const;
export type TarefaStatus = (typeof TAREFA_STATUS)[number];

export type TarefaEntityProps = {
  _id?: Types.ObjectId;
  descricao: string;
  prioridade: TarefaPrioridade;
  status: TarefaStatus;
  userId: Types.ObjectId;
  canteiroId: Types.ObjectId;
};

export class TarefaEntity {
  _id: Types.ObjectId;
  descricao: string;
  prioridade: TarefaPrioridade;
  status: TarefaStatus;
  userId: Types.ObjectId;
  canteiroId: Types.ObjectId;

  constructor({
    _id,
    descricao,
    prioridade,
    status,
    userId,
    canteiroId,
  }: TarefaEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.descricao = descricao;
    this.prioridade = prioridade;
    this.status = status;
    this.userId = userId;
    this.canteiroId = canteiroId;
  }

  static fromDocument(doc: Document & Partial<TarefaEntity>) {
    return new TarefaEntity({
      _id: doc._id as Types.ObjectId,
      descricao: String((doc as any).descricao),
      prioridade: (doc as any).prioridade as TarefaPrioridade,
      status: (doc as any).status as TarefaStatus,
      userId: (doc as any).userId as Types.ObjectId,
      canteiroId: (doc as any).canteiroId as Types.ObjectId,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      descricao: this.descricao,
      prioridade: this.prioridade,
      status: this.status,
      userId: this.userId?.toString(),
      canteiroId: this.canteiroId?.toString(),
    };
  }
}

export type TarefaDocument = Document & TarefaEntity;
