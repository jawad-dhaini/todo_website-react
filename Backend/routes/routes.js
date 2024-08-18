const express = require("express");
const { register, login } = require("../controllers/authControllers");
const {
  getUserTasks,
  addTask,
  editTask,
  delTask,
  deleteAllTasks,
  toggleComplete,
  toggleAllComplete,
} = require("../controllers/taskControllers");
const router = express.Router();
const isAuthorized = require("./auth");

router.post("/register", register);
router.post("/login", login);
router.post("/tasks", isAuthorized, getUserTasks);
router.post("/addtask", isAuthorized, addTask);
router.post("/edittask", isAuthorized, editTask);
router.post("/deltask", isAuthorized, delTask);
router.post("/deletealltasks", isAuthorized, deleteAllTasks);
router.post("/togglecomplete", isAuthorized, toggleComplete);
router.post("/toggleallcomplete", isAuthorized, toggleAllComplete);

module.exports = router;
