import type { Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const PORT: number = parseInt(`${process.env.PORT || 3000}`);

declare global {
  var mongooseGlobal: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

globalThis.mongooseGlobal = globalThis.mongooseGlobal || {
  conn: null,
  promise: null,
};

const connectdb = async () => {
  const mongooseGlobal = globalThis.mongooseGlobal!;

  if (mongooseGlobal.conn) {
    return mongooseGlobal.conn;
  }

  if (!mongooseGlobal.promise) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }
    mongooseGlobal.promise = mongoose.connect(process.env.DATABASE_URL);
  }

  mongooseGlobal.conn = await mongooseGlobal.promise;
  return mongooseGlobal.conn;
};

const startServer = async () => {
  await connectdb();
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
};

if (require.main === module) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

export default async function handler(req: Request, res: Response) {
  await connectdb();
  app(req, res);
}
