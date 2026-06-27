import express from "express";
import plantioController from "../controllers/plantio.controller";

const router = express.Router();

router.get("/", plantioController.getPlantios);
router.get("/:id", plantioController.getPlantio);
router.post("/", plantioController.postPlantio);
router.patch("/:id", plantioController.patchPlantio);
router.delete("/:id", plantioController.deletePlantio);

export default router;
