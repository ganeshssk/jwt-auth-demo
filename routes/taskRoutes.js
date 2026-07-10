const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const authMiddleware = require("../middleware/auth");


// Create task
router.post("/create", authMiddleware, taskController.createTask);


// Get all tasks
router.get("/all", authMiddleware, taskController.getAllTasks);


// Get task by ID
router.get("/:id", authMiddleware, taskController.getTaskById);


// Update task
router.put("/update/:id", authMiddleware, taskController.updateTask);


// Delete task
router.delete("/delete/:id", authMiddleware, taskController.deleteTask);


module.exports = router;
