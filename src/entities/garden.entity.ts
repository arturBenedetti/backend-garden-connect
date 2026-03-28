import mongoose, { Document } from "mongoose";

export interface Garden extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  localization: string;
}
