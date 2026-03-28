import express from "express";
import gardenController from "../controllers/garden.controller";

const router = express.Router();

router.get("/:id", gardenController.getGarden);
router.get("/", gardenController.getGardens);
router.post("/", gardenController.postGarden);
router.patch("/:id", gardenController.patchGarden);
router.delete("/:id", gardenController.deleteGarden);

export default router;
