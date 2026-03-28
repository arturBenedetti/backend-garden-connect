import express from "express";
import userRouter from "./user.router";
import gardenRouter from "./garden.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/gardens", gardenRouter);

export default router;
