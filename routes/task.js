import express from "express";
import { deleteMyTask, getMyTask, newTask, updateMyTask } from "../controlers/task.js";
import { isAuthenticated } from "../middleware/isauthenticated.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/all", isAuthenticated, getMyTask);
router.route("/:id").put(isAuthenticated , updateMyTask).delete(isAuthenticated , deleteMyTask);

export default router;
