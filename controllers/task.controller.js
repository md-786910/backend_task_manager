// app/controllers/taskController.js

const db = require("../models/index");

const Task = db.taskModel;

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  try {
    const newTask = await Task.create({
      title: title,
      description: description,
      completed: false,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task Delete Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
};
