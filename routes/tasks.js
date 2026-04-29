// routes/tasks.js
const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
