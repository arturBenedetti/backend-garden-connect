import express from "express";
import userRouter from "./user.router";
import gardenRouter from "./garden.router";
import equipmentRouter from "./equipment.router";
import insumoRouter from "./insumo.router";
import canteiroRouter from "./canteiro.router";
import especiePlantaRouter from "./especie-planta.router";
import plantioRouter from "./plantio.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/gardens", gardenRouter);
router.use("/equipments", equipmentRouter);
router.use("/insumos", insumoRouter);
router.use("/canteiros", canteiroRouter);
router.use("/especies-planta", especiePlantaRouter);
router.use("/plantios", plantioRouter);

export default router;
