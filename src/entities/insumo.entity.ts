import mongoose, { Document, Types } from "mongoose";

export type InsumoEntityProps = {
  _id?: Types.ObjectId;
  nome: string;
  quantidade: number;
  unidade: string;
  gardenId: Types.ObjectId;
};

export class InsumoEntity {
  _id: Types.ObjectId;
  nome: string;
  quantidade: number;
  unidade: string;
  gardenId: Types.ObjectId;

  constructor({ _id, nome, quantidade, unidade, gardenId }: InsumoEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.nome = nome;
    this.quantidade = quantidade;
    this.unidade = unidade;
    this.gardenId = gardenId;
  }

  static fromDocument(doc: Document & Partial<InsumoEntity>) {
    return new InsumoEntity({
      _id: doc._id as Types.ObjectId,
      nome: String((doc as any).nome),
      quantidade: Number((doc as any).quantidade),
      unidade: String((doc as any).unidade),
      gardenId: (doc as any).gardenId as Types.ObjectId,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      nome: this.nome,
      quantidade: this.quantidade,
      unidade: this.unidade,
      gardenId: this.gardenId?.toString(),
    };
  }
}

export type InsumoDocument = Document & InsumoEntity;
