import express from "express";
import asyncHandler from "express-async-handler";
import UserTodo from "../Models/TodoModel.js";

const userTodoRouter = express.Router();

// Add Project
userTodoRouter.post(
  "/add/project",
  asyncHandler(async (req, res) => {
    const { email, title, TODO, description } = req.body;
    const project = await UserTodo.create({
      email,
      title,
      todos: { TODO, description },
    }); // Create Project

    if (project) {
      res.status(201).json({
        project,
        message: "Project created",
      });
    } else {
      res.status(400);
      throw new Error("Invalid TODO Data");
    }
  })
);

// Delete Project
userTodoRouter.post(
  "/delete/project/",
  asyncHandler(async (req, res) => {
    const { _id } = req.body;
    const project = await UserTodo.findOne({
      _id,
    }); // Find Project to delete

    if (project) {
      project.remove();
      res.json({
        message: "Project deleted",
      });
    } else {
      res.status(400);
      throw new Error("Project Does not Exist");
    }
  })
);

// Get Projects
userTodoRouter.get(
  "/retrieve",
  asyncHandler(async (req, res) => {
    const { email } = req.query;
    const projects = await UserTodo.find({ email });

    if (projects) {
      res.json({
        projects,
      });
    } else {
      res.status(400);
      throw new Error("Projects do not Exist");
    }
  })
);

// Add TODOs
userTodoRouter.post(
  "/add/todo",
  asyncHandler(async (req, res) => {
    const { _id, TODO, description } = req.body;
    const project = await UserTodo.findOne({ _id }); // Find Project to add TODO

    if (project) {
      const todo = {
        TODO,
        description,
      };
      project.todos.push(todo); // Add TODO

      await project.save(); // Save changes
    } else {
      res.status(400);
      throw new Error("Invalid TODO Data");
    }
  })
);

// Remove TODOs
userTodoRouter.post(
  "/remove/todo",
  asyncHandler(async (req, res) => {
    const { _id, TODO, description } = req.body;
    const project = await UserTodo.findOne({
      _id,
    }); // Find Project to remove TODO

    if (project) {
      const todo = { TODO, description };

      project.todos.remove(todo); // Remove TODO

      await project.save(); // Save changes
      res.json({
        message: "TODO removed",
      });
    } else {
      res.status(400);
      throw new Error("TODO Does not Exist");
    }
  })
);

export default userTodoRouter;
