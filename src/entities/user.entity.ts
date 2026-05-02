import mongoose, { Document, Types } from "mongoose";

export type UserEntityProps = {
  _id?: Types.ObjectId;
  name: string;
  cpf: string;
  email: string;
  password?: string;
  type?: "user" | "admin";
};

export class UserEntity {
  _id: Types.ObjectId;
  name: string;
  cpf: string;
  email: string;
  password: string | undefined;
  type: "user" | "admin";

  constructor({ _id, name, cpf, email, password, type = "user" }: UserEntityProps) {
    this._id = _id ?? new mongoose.Types.ObjectId();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static fromDocument(doc: Document & Partial<UserEntity>) {
    return new UserEntity({
      _id: doc._id as Types.ObjectId,
      name: String((doc as any).name),
      cpf: String((doc as any).cpf),
      email: String((doc as any).email),
      password: (doc as any).password,
      type: (doc as any).type || "user",
    });
  }

  toJSON() {
    return {
      _id: this._id?.toString(),
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      type: this.type,
    };
  }
}

export type UserDocument = Document & UserEntity;
