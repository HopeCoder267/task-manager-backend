// controllers/taskController.js
const pool = require("../db");

// Get all tasks (only title + short description for list)
async function getTasks(req, res) {
  try {
    const result = await pool.query("SELECT id, title, description, completed FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get task by ID (includes detailed description)
async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add new task
async function addTask(req, res) {
  try {
    const { title, description, detailed_description, completed } = req.body;
    await pool.query(
      "INSERT INTO tasks (title, description, detailed_description, completed) VALUES ($1, $2, $3, $4)",
      [title, description, detailed_description, completed]
    );
    res.json({ message: "Task added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update task
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, detailed_description, completed } = req.body;
    await pool.query(
      "UPDATE tasks SET title=$1, description=$2, detailed_description=$3, completed=$4 WHERE id=$5",
      [title, description, detailed_description, completed, id]
    );
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete task
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTasks, getTaskById, addTask, updateTask, deleteTask };
