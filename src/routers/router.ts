import express from "express";
import userRouter from "./user.router";
import gardenRouter from "./garden.router";
import equipmentRouter from "./equipment.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/gardens", gardenRouter);
router.use("/equipments", equipmentRouter);

export default router;
