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

async function getTasksFromDB(token) {
  return await sendPostRequest("tasks", { accessToken: token });
}

async function addTask(task, token) {
  return await sendPostRequest("addtask", {
    taskText: task,
    accessToken: token,
  });
}

async function editTask(taskId, task, token) {
  return await sendPostRequest("edittask", {
    taskId: taskId,
    taskText: task,
    accessToken: token,
  });
}

async function deleteTask(id, token) {
  return await sendPostRequest("deltask", {
    taskId: id,
    accessToken: token,
  });
}

async function toggleComplete(id, isCompleted, token) {
  return await sendPostRequest("togglecomplete", {
    taskId: id,
    accessToken: token,
    isComplete: isCompleted,
  });
}

async function toggleAllComplete(isComplete, token) {
  return await sendPostRequest("toggleallcomplete", {
    accessToken: token,
    isComplete: isComplete,
  });
}

async function deleteAllTasks(token) {
  return await sendPostRequest("deletealltasks", {
    accessToken: token,
  });
}

module.exports = {
  addTask,
  editTask,
  getTasksFromDB,
  deleteTask,
  deleteAllTasks,
  toggleComplete,
  toggleAllComplete,
};
