import mongoose, { Document, Types } from "mongoose";

export type GardenEntityProps = {
  _id?: Types.ObjectId;
  name: string;
  localization: string;
};

export class GardenEntity {
  _id: Types.ObjectId;
  name: string;
  localization: string;

  constructor({ _id, name, localization }: GardenEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.name = name;
    this.localization = localization;
  }

  static fromDocument(doc: Document & Partial<GardenEntity>) {
    return new GardenEntity({
      _id: doc._id as Types.ObjectId,
      name: String((doc as any).name),
      localization: String((doc as any).localization),
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      name: this.name,
      localization: this.localization,
    };
  }
}

export type GardenDocument = Document & GardenEntity;
