import mongoose, { Document, Types } from "mongoose";

export type CanteiroEntityProps = {
  _id?: Types.ObjectId;
  numero: number;
  area: number;
  gardenId: Types.ObjectId;
};

export class CanteiroEntity {
  _id: Types.ObjectId;
  numero: number;
  area: number;
  gardenId: Types.ObjectId;

  constructor({ _id, numero, area, gardenId }: CanteiroEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.numero = numero;
    this.area = area;
    this.gardenId = gardenId;
  }

  static fromDocument(doc: Document & Partial<CanteiroEntity>) {
    return new CanteiroEntity({
      _id: doc._id as Types.ObjectId,
      numero: Number((doc as any).numero),
      area: Number((doc as any).area),
      gardenId: (doc as any).gardenId as Types.ObjectId,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      numero: this.numero,
      area: this.area,
      gardenId: this.gardenId?.toString(),
    };
  }
}

export type CanteiroDocument = Document & CanteiroEntity;
