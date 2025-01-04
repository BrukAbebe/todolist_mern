const path = require("path");
const fs = require("fs");
const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const attachments = req.files ? req.files.map((file) => file.filename) : [];
    const taskData = {
      ...req.body,
      attachments,
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      category: req.body.category || null,
    };

    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.dueDate === "") {
    updates.dueDate = null;
  } else if (updates.dueDate) {
    const parsedDate = new Date(updates.dueDate);
    if (isNaN(parsedDate.getTime())) {
      updates.dueDate = null;
    } else {
      updates.dueDate = parsedDate;
    }
  } else {
    updates.dueDate = null;
  }

  if (updates.category === "") {
    updates.category = null;
  }

  const newAttachments = req.files
    ? req.files.map((file) => file.filename)
    : [];

  try {
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = updates.title || task.title;
    task.description = updates.description || task.description;
    task.priority = updates.priority || task.priority;
    task.dueDate =
      updates.dueDate !== undefined ? updates.dueDate : task.dueDate;
    task.category =
      updates.category !== undefined ? updates.category : task.category;
    task.notes = updates.notes || task.notes;
    task.completed =
      updates.completed !== undefined ? updates.completed : task.completed;

    if (newAttachments.length > 0) {
      task.attachments = newAttachments;
    }

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching task by ID: ${error.message}` });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting task: ${error.message}` });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
