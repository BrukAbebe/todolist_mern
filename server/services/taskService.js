const Task = require("../models/taskModel");

const getAllTasks = async () => {
  try {
    return await Task.find().populate("category");
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

const getTaskById = async (taskId) => {
  try {
    return await Task.findById(taskId).populate("category");
  } catch (error) {
    throw new Error(`Error fetching task by ID: ${error.message}`);
  }
};

const createTask = async (taskData) => {
  try {
    if (taskData.dueDate === "") {
      taskData.dueDate = null;
    } else if (taskData.dueDate) {
      const parsedDate = new Date(taskData.dueDate);
      if (isNaN(parsedDate.getTime())) {
        taskData.dueDate = null;
      } else {
        taskData.dueDate = parsedDate;
      }
    } else {
      taskData.dueDate = null;
    }

    if (taskData.category === "") {
      taskData.category = null;
    }

    const task = new Task(taskData);
    return await task.save();
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

const updateTask = async (taskId, updates) => {
  try {
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

    return await Task.findByIdAndUpdate(taskId, updates, { new: true });
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

const deleteTask = async (taskId) => {
  try {
    await Task.findByIdAndDelete(taskId);
    return { message: "Task deleted" };
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
