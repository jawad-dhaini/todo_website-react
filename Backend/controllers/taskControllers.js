const {
  getRecords,
  insertRecord,
  deleteRecord,
  editRecord,
} = require("../utils/sqlFunctions");

async function getUserTasks(req, res) {
  const { user_id } = req.body;
  const tasksArr = await getRecords("tasks", "user_id", user_id);
  res.status(200).json({
    tasks: tasksArr,
  });
}

async function addTask(req, res) {
  try {
    const { task_text, user_id } = req.body;
    const task = { task_text, user_id, is_complete: 0 };
    await insertRecord("tasks", task);
    const tasksArr = await getRecords("tasks", "user_id", user_id);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function editTask(req, res) {
  try {
    const { task_id, task_text, user_id } = req.body;
    await editRecord("tasks", "task_text", "task_id", [task_text, task_id]);
    const tasksArr = await getRecords("tasks", "user_id", user_id);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function delTask(req, res) {
  try {
    const { task_id, user_id } = req.body;
    await deleteRecord("tasks", "task_id", task_id);
    const tasksArr = await getRecords("tasks", "user_id", user_id);
    res.status(200).json({
      tasks: tasksArr,
    });
  } catch (err) {
    console.error(err);
  }
}

async function toggleComplete(req, res) {
  try {
    const { task_id, user_id, is_complete } = req.body;
    const complete_status = -is_complete + 1;
    await editRecord("tasks", "is_complete", "task_id", [
      complete_status,
      task_id,
    ]);

    const tasksArr = await getRecords("tasks", "user_id", user_id);
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
