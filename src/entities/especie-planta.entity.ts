import mongoose, { Document, Types } from "mongoose";

export type EspeciePlantaEntityProps = {
  _id?: Types.ObjectId;
  nome_comum: string;
  nome_cientifico: string;
  tempo_colheita_dias: number;
};

export class EspeciePlantaEntity {
  _id: Types.ObjectId;
  nome_comum: string;
  nome_cientifico: string;
  tempo_colheita_dias: number;

  constructor({
    _id,
    nome_comum,
    nome_cientifico,
    tempo_colheita_dias,
  }: EspeciePlantaEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.nome_comum = nome_comum;
    this.nome_cientifico = nome_cientifico;
    this.tempo_colheita_dias = tempo_colheita_dias;
  }

  static fromDocument(doc: Document & Partial<EspeciePlantaEntity>) {
    return new EspeciePlantaEntity({
      _id: doc._id as Types.ObjectId,
      nome_comum: String((doc as any).nome_comum),
      nome_cientifico: String((doc as any).nome_cientifico),
      tempo_colheita_dias: Number((doc as any).tempo_colheita_dias),
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      nome_comum: this.nome_comum,
      nome_cientifico: this.nome_cientifico,
      tempo_colheita_dias: this.tempo_colheita_dias,
    };
  }
}

export type EspeciePlantaDocument = Document & EspeciePlantaEntity;
