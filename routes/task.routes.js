const express = require("express");
const {
  addTask,
  getAllTasks,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/task.controller");
const taskRouter = express.Router();

taskRouter.post("/create", addTask);
taskRouter.get("/getTask", getAllTasks);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.put("/update/:id", updateTaskStatus);

module.exports = taskRouter;
