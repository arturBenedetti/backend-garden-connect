import mongoose, { Document } from "mongoose";

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  cpf: string;
  email: string;
  type: string;
}
