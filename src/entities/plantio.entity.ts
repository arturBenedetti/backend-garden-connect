import mongoose, { Document, Types } from "mongoose";

export const PLANTIO_STATUS = ["ativo", "colhido", "cancelado"] as const;
export type PlantioStatus = (typeof PLANTIO_STATUS)[number];

export type PlantioEntityProps = {
  _id?: Types.ObjectId;
  canteiroId: Types.ObjectId;
  especieId: Types.ObjectId;
  data_inicio: Date;
  status: PlantioStatus;
};

export class PlantioEntity {
  _id: Types.ObjectId;
  canteiroId: Types.ObjectId;
  especieId: Types.ObjectId;
  data_inicio: Date;
  status: PlantioStatus;

  constructor({
    _id,
    canteiroId,
    especieId,
    data_inicio,
    status,
  }: PlantioEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.canteiroId = canteiroId;
    this.especieId = especieId;
    this.data_inicio = data_inicio;
    this.status = status;
  }

  static fromDocument(doc: Document & Partial<PlantioEntity>) {
    return new PlantioEntity({
      _id: doc._id as Types.ObjectId,
      canteiroId: (doc as any).canteiroId as Types.ObjectId,
      especieId: (doc as any).especieId as Types.ObjectId,
      data_inicio: new Date((doc as any).data_inicio),
      status: (doc as any).status as PlantioStatus,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      canteiroId: this.canteiroId?.toString(),
      especieId: this.especieId?.toString(),
      data_inicio: this.data_inicio?.toISOString(),
      status: this.status,
    };
  }
}

export type PlantioDocument = Document & PlantioEntity;
