const express = require("express");

const {
  listAllTasks,
  listSpecifiedTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/todos");

const route = express.Router();

route.get("/", listAllTasks);

route.get("/:id", listSpecifiedTask);

route.post("/create", createTask);

route.put("/update/:id", updateTask);

route.delete("/delete/:id", deleteTask);

module.exports = route;
