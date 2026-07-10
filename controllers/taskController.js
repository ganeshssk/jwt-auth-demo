const Task = require("../models/task");

// =====================
// CREATE TASK
// =====================
exports.createTask = async (req, res) => {

    try {

        const { title, description, priority, assignedUser } = req.body;

        // Validate required fields
        if (!title || !description || !assignedUser) {
            return res.status(400).json({
                message: "Title, Description, and Assigned User are required"
            });
        }

        // Create new task
        const newTask = await Task.create({
            title: title,
            description: description,
            priority: priority || "Medium",
            assignedUser: assignedUser,
            status: "Pending"
        });

        res.status(201).json({
            message: "Task Created Successfully",
            task: newTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message
        });
    }
};


// =====================
// GET ALL TASKS
// =====================
exports.getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find().populate("assignedUser", "name email");

        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks: tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving tasks",
            error: error.message
        });
    }
};


// =====================
// GET TASK BY ID
// =====================
exports.getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id).populate("assignedUser", "name email");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task retrieved successfully",
            task: task
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving task",
            error: error.message
        });
    }
};


// =====================
// UPDATE TASK
// =====================
exports.updateTask = async (req, res) => {

    try {

        const { title, description, status, priority, assignedUser } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: title,
                description: description,
                status: status,
                priority: priority,
                assignedUser: assignedUser
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task Updated Successfully",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
};


// =====================
// DELETE TASK
// =====================
exports.deleteTask = async (req, res) => {

    try {

        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task Deleted Successfully",
            task: deletedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });
    }
};
