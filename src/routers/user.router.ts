import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", userController.getUser);
router.get("/", userController.getUsers);
router.post("/", userController.postUser);
router.patch("/:id", userController.patchUser);
router.delete("/:id", userController.deleteUser);

export default router;
