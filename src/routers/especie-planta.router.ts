import express from "express";
import especiePlantaController from "../controllers/especie-planta.controller";

const router = express.Router();

router.get("/", especiePlantaController.getEspeciesPlanta);
router.get("/:id/plantios", especiePlantaController.getEspeciePlantaPlantios);
router.get("/:id", especiePlantaController.getEspeciePlanta);
router.post("/", especiePlantaController.postEspeciePlanta);
router.patch("/:id", especiePlantaController.patchEspeciePlanta);
router.delete("/:id", especiePlantaController.deleteEspeciePlanta);

export default router;
