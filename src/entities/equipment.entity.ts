import mongoose, { Document, Types } from "mongoose";

export type EquipmentEntityProps = {
  _id?: Types.ObjectId;
  name: string;
  state: string;
  gardenId: Types.ObjectId;
};

export class EquipmentEntity {
  _id: Types.ObjectId;
  name: string;
  state: string;
  gardenId: Types.ObjectId;

  constructor({ _id, name, state, gardenId }: EquipmentEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.name = name;
    this.state = state;
    this.gardenId = gardenId;
  }

  static fromDocument(doc: Document & Partial<EquipmentEntity>) {
    return new EquipmentEntity({
      _id: doc._id as Types.ObjectId,
      name: String((doc as any).name),
      state: String((doc as any).state),
      gardenId: (doc as any).gardenId as Types.ObjectId,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      name: this.name,
      state: this.state,
      gardenId: this.gardenId?.toString(),
    };
  }
}

export type EquipmentDocument = Document & EquipmentEntity;
