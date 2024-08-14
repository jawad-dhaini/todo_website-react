const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const {
  getRecords,
  insertRecord,
  deleteRecord,
  editRecord,
  toggleRecord,
} = require("../utils/sqlFunctions");

function getUserIdFromAccessToken(accessToken) {
  return jwt.verify(accessToken, process.env.JWT_SECRET).userId;
}

async function getUserTasks(req, res) {
  const { accessToken } = req.body;
  const userId = await getUserIdFromAccessToken(accessToken);
  const tasksArr = await getRecords("tasks", "user_id", userId);
  res.status(200).json({
    tasks: tasksArr,
  });
}

async function addTask(req, res) {
  try {
    const { taskText, accessToken } = req.body;
    const userId = await getUserIdFromAccessToken(accessToken);
    const task = { task_text: taskText, user_id: userId, is_complete: 0 };
    await insertRecord("tasks", task);
    const tasksArr = await getRecords("tasks", "user_id", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function editTask(req, res) {
  try {
    const { taskId, taskText, accessToken } = req.body;
    await editRecord("tasks", "task_text", "task_id", [taskText, taskId]);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "user_id", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function delTask(req, res) {
  try {
    const { taskId, accessToken } = req.body;
    await deleteRecord("tasks", "task_id", taskId);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "user_id", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function toggleComplete(req, res) {
  try {
    const { taskId, accessToken, isComplete } = req.body;
    const completeStatus = -isComplete + 1;
    await toggleRecord("tasks", "is_complete", "task_id", [
      completeStatus,
      taskId,
    ]);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "user_id", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUserTasks,
  addTask,
  editTask,
  delTask,
  toggleComplete,
};
