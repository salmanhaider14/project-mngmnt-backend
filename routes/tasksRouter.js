import express from "express";
import checkUserRole from "../middlewares/roleCheck.js";
import checkAuth from "../middlewares/authCheck.js";
import Task from "../models/Task.js";

const router = express.Router();

// Create a new task
router.post("/", checkAuth(), async (req, res) => {
  try {
    const { title, description, dueDate, project, status } = req.body;
    const assignedUser = req.userId;
    const task = new Task({
      title,
      description,
      assignedUser,
      dueDate,
      project,
      status,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create a new task." });
  }
});

// Retrieve a list of tasks within a project (filtered based on user's role)
router.get("/", checkAuth(), async (req, res) => {
  try {
    const { projectId } = req.query;
    let tasks;
    if (req.userRole === 2) {
      // Admins can see all tasks in the project
      tasks = await Task.find({ project: projectId });
    } else {
      // Team members can see only tasks assigned to them in the project
      tasks = await Task.find({
        project: projectId,
        assignedUser: req.userId,
      });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve tasks." });
  }
});

// Retrieve task details
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve task details." });
  }
});

// Update task details (admin-only)
router.put("/:taskId", checkAuth(), async (req, res) => {
  try {
    const { title, description, assignedUser, dueDate, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, assignedUser, dueDate, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task details." });
  }
});

// Delete a task (admin-only)
router.delete("/:taskId", checkAuth(), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the task." });
  }
});

export default router;
