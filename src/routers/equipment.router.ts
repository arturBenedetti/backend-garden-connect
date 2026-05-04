import express from "express";
import equipmentController from "../controllers/equipment.controller";

const router = express.Router();

router.get("/", equipmentController.getEquipments);
router.get("/:id", equipmentController.getEquipment);
router.post("/", equipmentController.postEquipment);
router.patch("/:id", equipmentController.patchEquipment);
router.delete("/:id", equipmentController.deleteEquipment);

export default router;
