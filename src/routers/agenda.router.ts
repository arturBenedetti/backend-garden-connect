import express from "express";
import agendaController from "../controllers/agenda.controller";

const router = express.Router();

router.get("/", agendaController.getAgendas);
router.get("/:id", agendaController.getAgenda);
router.post("/", agendaController.postAgenda);
router.patch("/:id", agendaController.patchAgenda);
router.delete("/:id", agendaController.deleteAgenda);

export default router;
