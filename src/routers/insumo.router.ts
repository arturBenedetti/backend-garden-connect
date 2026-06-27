import express from "express";
import insumoController from "../controllers/insumo.controller";

const router = express.Router();

router.get("/", insumoController.getInsumos);
router.get("/:id", insumoController.getInsumo);
router.post("/", insumoController.postInsumo);
router.patch("/:id", insumoController.patchInsumo);
router.delete("/:id", insumoController.deleteInsumo);

export default router;
