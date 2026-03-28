import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const PORT: number = parseInt(`${process.env.PORT || 3000}`);

const connectdb = async () => {
  try {
    await mongoose.connect(String(process.env.DATABASE_URL));
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log("Failed to connect to the database: ", err);
  }
};

connectdb();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
