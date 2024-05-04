const express = require("express");

const {
  listAllTasks,
  listSpecifiedTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/todos");

const validId = require('../middlewares/validId')

const route = express.Router();

route.get("/", listAllTasks);

route.get("/:id",validId, listSpecifiedTask);

route.post("/create", createTask);

route.put("/update/:id",validId, updateTask);

route.delete("/delete/:id",validId, deleteTask);

module.exports = route;
