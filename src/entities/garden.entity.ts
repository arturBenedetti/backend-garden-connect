import mongoose, { Document, Types } from "mongoose";

export type GardenEntityProps = {
  _id?: Types.ObjectId;
  name: string;
  localization: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

export class GardenEntity {
  _id: Types.ObjectId;
  name: string;
  localization: string;
  latitude: number | undefined;
  longitude: number | undefined;

  constructor({ _id, name, localization, latitude, longitude }: GardenEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.name = name;
    this.localization = localization;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static fromDocument(doc: Document & Partial<GardenEntity>) {
    return new GardenEntity({
      _id: doc._id as Types.ObjectId,
      name: String((doc as any).name),
      localization: String((doc as any).localization),
      latitude:
        (doc as any).latitude != null ? Number((doc as any).latitude) : undefined,
      longitude:
        (doc as any).longitude != null ? Number((doc as any).longitude) : undefined,
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      name: this.name,
      localization: this.localization,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}

export type GardenDocument = Document & GardenEntity;
