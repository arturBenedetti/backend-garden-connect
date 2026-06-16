import express from "express";
import canteiroController from "../controllers/canteiro.controller";

const router = express.Router();

router.get("/", canteiroController.getCanteiros);
router.get("/:id/plantios", canteiroController.getCanteiroPlantios);
router.get("/:id", canteiroController.getCanteiro);
router.post("/", canteiroController.postCanteiro);
router.patch("/:id", canteiroController.patchCanteiro);
router.delete("/:id", canteiroController.deleteCanteiro);

export default router;
