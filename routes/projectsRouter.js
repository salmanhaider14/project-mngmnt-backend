import express from "express";
import checkUserRole from "../middlewares/roleCheck.js";
import Project from "../models/Project.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

// Create a new project (admin-only)
router.post("/", checkAuth(), async (req, res) => {
  try {
    const { name, description } = req.body;
    const owner = req.userId; // Assuming you have user authentication middleware
    const project = new Project({ name, description, owner });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create a new project." });
  }
});

// Retrieve a list of projects (filtered based on user's role)
router.get("/", checkAuth(), async (req, res) => {
  try {
    let projects;
    if (req.userRole === 1) {
      // Admins can see all projects
      projects = await Project.find();
    } else {
      // Team members can see only their projects (assuming you have a user-project relationship)
      projects = await Project.find({ owner: req.userId });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve projects." });
  }
});

// Retrieve project details
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve project details." });
  }
});

// Update project details (admin-only)
router.put("/:projectId", checkAuth(), async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { name, description },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update project details." });
  }
});

// Delete a project (admin-only)
router.delete("/:projectId", checkAuth(), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the project." });
  }
});

export default router;
