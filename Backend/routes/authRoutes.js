const express = require("express");
const { register, login } = require("../controllers/authControllers");
const {
  getUserTasks,
  addTask,
  editTask,
  delTask,
  toggleComplete,
} = require("../controllers/taskControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/tasks", getUserTasks);
router.post("/addtask", addTask);
router.post("/edittask", editTask);
router.post("/deltask", delTask);
router.post("/togglecomplete", toggleComplete);

module.exports = router;
