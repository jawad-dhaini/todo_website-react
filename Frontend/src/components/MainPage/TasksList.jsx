import React from "react";
import {
  editTask,
  deleteTask,
  deleteAllTasks,
  toggleComplete,
  toggleAllComplete,
} from "../../App/utils/DbHelperFunctions";
import { VscTrash, VscEdit } from "react-icons/vsc";

const TasksList = (props) => {
  function delTask(id) {
    props.taskHandle(deleteTask, id, props.accessToken);
  }

  function toggleIsEditing(id, tasks, bool) {
    const tasksClone = tasks.slice();
    tasksClone.find((task) => task.taskId === id).isEditing = bool;
    props.setTasks(tasksClone);
  }

  function handleEditTask(id, task) {
    if (task === "") return;
    props.taskHandle(editTask, id, task, props.accessToken);
  }

  function toggleCompleted(id, isComplete) {
    props.taskHandle(toggleComplete, id, isComplete, props.accessToken);
  }

  function toggleAllCompleted(isComplete) {
    props.taskHandle(toggleAllComplete, isComplete, props.accessToken);
    document
      .querySelectorAll(".checkbox")
      .forEach((el) => (el.checked = isComplete));
  }

  function delAllTasks() {
    props.taskHandle(deleteAllTasks, props.accessToken);
  }

  return (
    <div className="container">
      <button className="btnAllComplete" onClick={() => toggleAllCompleted(1)}>
        Toggle All Complete
      </button>
      <button onClick={() => toggleAllCompleted(0)}>
        Toggle All Incomplete
      </button>
      <button onClick={() => delAllTasks()}>Delete All</button>

      <ul className="list">
        {props.tasks.map((task) => (
          <li
            className="listEl"
            key={task.taskId}
            style={task.isComplete ? { opacity: 0.4 } : { opacity: 1 }}
          >
            <input
              className={task.isEditing ? "checkbox hidden" : "checkbox"}
              type="checkbox"
              defaultChecked={task.isComplete ? true : false}
              onClick={() => toggleCompleted(task.taskId, task.isComplete)}
            />
            <form
              className={
                task.isEditing ? "formEditTask" : "formEditTask hidden"
              }
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTask(
                  task.taskId,
                  e.target.querySelector("input").value
                );
              }}
            >
              <input
                type="text"
                className="inputEditTask"
                ref={(input) => input && input.focus()}
                defaultValue={task.taskText}
                onBlur={(e) => {
                  toggleIsEditing(task.taskId, props.tasks, false);
                  e.target.value = task.taskText;
                }}
                onKeyDown={(e) => {
                  if (e.code === "Escape") {
                    toggleIsEditing(task.taskId, props.tasks, false);
                    e.target.value = task.taskText;
                  }
                }}
              />
            </form>
            <p
              className={task.isEditing ? "task hidden" : "task"}
              onDoubleClick={() => {
                toggleIsEditing(task.taskId, props.tasks, true);
              }}
            >
              {task.taskText}
            </p>
            <div className="editdel">
              <VscEdit
                size={28}
                className={task.isEditing ? "edit hidden" : "edit"}
                onClick={() => {
                  toggleIsEditing(task.taskId, props.tasks, true);
                }}
              />
              <VscTrash
                size={28}
                className={task.isEditing ? "delete hidden" : "delete"}
                onClick={() => delTask(task.taskId)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
