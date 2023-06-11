import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTasks,
  getTask,
  getTasks,
  updateTasks,
} from "../controllers/tasks.controller.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";
import { validateSchema } from "../middlewares/validator.midelware.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", authRequired, getTask);

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask,
);

router.delete("/tasks/:id", authRequired, deleteTasks);

router.put("/tasks/:id", authRequired, updateTasks);

export default router;
