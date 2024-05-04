const mongoose = require("mongoose");
const TaskModel = require("../models/TaskModel");

const listAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length === 0) {
      res.status(404).send("Tasks not found");
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).send("Internal Server Error");
  }
};

const listSpecifiedTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findOne({ _id: id });
    if (task) {
      return res.status(200).send(task);
    } else {
      return res.status(404).send("Task not found!");
    }
  } catch (error) {
    console.error("Error fetching task: ", error);
    return res.status(500).send("Internal Server Error");
  }
};

const createTask = async (req, res) => {
  const body = req.body;

  if (!body || !body.title) {
    return res.status(400).send("No title found!");
  }

  try {
    const newTask = new TaskModel({ title: body.title });
    const savedTask = await newTask.save();
    return res.status(201).send(savedTask);
  } catch (error) {
    if (error.name == "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).send(errorMessage);
    } else {
      console.error("Error creating task: ", error);
      return res.status(500).send("Internal Server Error");
    }
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body) {
    return res.status(400).send("No body given");
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, body, {
      new: true, runValidators: true
    });
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    } else {
      return res.status(200).send(updatedTask);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).send(errorMessage);
    } else {
      console.error("Error updating task: ", error);
      return res.status(500).send("Internal Server Error");
    }
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send("Task not found");
    } else {
      return res.status(200).send(`${deletedTask.title} deleted successfully`);
    }
  } catch (error) {
    console.error("Error deleting task: ", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  listAllTasks,
  listSpecifiedTask,
  createTask,
  updateTask,
  deleteTask,
};
