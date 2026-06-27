import express from "express";
import tarefaController from "../controllers/tarefa.controller";

const router = express.Router();

router.get("/", tarefaController.getTarefas);
router.get("/:id/agendas", tarefaController.getTarefaAgendas);
router.get("/:id", tarefaController.getTarefa);
router.post("/", tarefaController.postTarefa);
router.patch("/:id", tarefaController.patchTarefa);
router.delete("/:id", tarefaController.deleteTarefa);

export default router;
