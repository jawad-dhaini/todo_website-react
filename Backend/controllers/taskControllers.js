const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const {
  getRecords,
  insertTask,
  deleteRecord,
  editRecord,
  toggleRecord,
  toggleAllRecords,
} = require("../utils/sqlFunctions");

function getUserIdFromAccessToken(accessToken) {
  return jwt.verify(accessToken, process.env.JWT_SECRET).userId;
}

async function getUserTasks(req, res) {
  const { accessToken } = req.body;
  const userId = await getUserIdFromAccessToken(accessToken);
  const tasksArr = await getRecords("tasks", "userId", userId);
  res.status(200).json({
    tasks: tasksArr,
  });
}

async function addTask(req, res) {
  try {
    const { taskText, accessToken } = req.body;
    const userId = await getUserIdFromAccessToken(accessToken);
    const task = { taskText: taskText, userId: userId, isComplete: 0 };
    await insertTask("tasks", task);
    const tasksArr = await getRecords("tasks", "userId", userId);
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
    await editRecord("tasks", "taskText", "taskId", [taskText, taskId]);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "userId", userId);
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
    await deleteRecord("tasks", "taskId", taskId);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "userId", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function deleteAllTasks(req, res) {
  try {
    const { accessToken } = req.body;
    const userId = await getUserIdFromAccessToken(accessToken);
    await deleteRecord("tasks", "userId", userId);
    const tasksArr = await getRecords("tasks", "userId", userId);
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
    await toggleRecord("tasks", "isComplete", "taskId", [
      completeStatus,
      taskId,
    ]);
    const userId = await getUserIdFromAccessToken(accessToken);
    const tasksArr = await getRecords("tasks", "userId", userId);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function toggleAllComplete(req, res) {
  try {
    const { accessToken, isComplete } = req.body;
    const userId = await getUserIdFromAccessToken(accessToken);
    await toggleAllRecords("tasks", "isComplete", "userId", [
      isComplete,
      userId,
    ]);
    const tasksArr = await getRecords("tasks", "userId", userId);
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
  deleteAllTasks,
  toggleComplete,
  toggleAllComplete,
};
