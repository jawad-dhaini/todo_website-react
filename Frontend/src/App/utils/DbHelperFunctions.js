async function sendPostRequest(path, body) {
  try {
    const res = await fetch(`http://localhost:5000/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function addTask(task, user_id) {
  return await sendPostRequest("addtask", {
    task_text: task,
    user_id: user_id,
  });
}

async function editTask(taskId, task, user_id) {
  return await sendPostRequest("edittask", {
    task_id: taskId,
    task_text: task,
    user_id: user_id,
  });
}

async function deleteTask(id, user_id) {
  return await sendPostRequest("deltask", {
    task_id: id,
    user_id: user_id,
  });
}

async function toggleComplete(id, is_completed, user_id) {
  return await sendPostRequest("togglecomplete", {
    task_id: id,
    user_id: user_id,
    is_complete: is_completed,
  });
}

async function getTasksFromDB(id) {
  return await sendPostRequest("tasks", { user_id: id });
}

module.exports = {
  addTask,
  editTask,
  getTasksFromDB,
  deleteTask,
  toggleComplete,
};
