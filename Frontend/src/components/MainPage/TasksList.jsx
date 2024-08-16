import React from "react";
import {
  editTask,
  deleteTask,
  toggleComplete,
  toggleAllComplete,
} from "../../App/utils/DbHelperFunctions";
import { VscTrash, VscEdit } from "react-icons/vsc";

const TasksList = (props) => {
  async function taskHandle(...args) {
    const tasksObj = await args[0](...args.slice(1));
    const tasksArr = tasksObj.tasks;
    if (!tasksArr) {
      props.setTasks([]);
      return;
    }
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    props.setTasks(tasksArr);
  }

  async function delTask(id) {
    taskHandle(deleteTask, id, props.accessToken);
  }

  function toggleIsEditing(id, tasks, bool) {
    const tasksClone = tasks.slice();
    tasksClone.find((task) => task.task_id === id).isEditing = bool;
    props.setTasks(tasksClone);
  }

  async function handleEditTask(id, task) {
    if (task === "") return;
    taskHandle(editTask, id, task, props.accessToken);
  }

  async function toggleCompleted(id, isComplete) {
    taskHandle(toggleComplete, id, isComplete, props.accessToken);
  }

  async function toggleAllCompleted(isComplete) {
    taskHandle(toggleAllComplete, isComplete, props.accessToken);
    document
      .querySelectorAll(".checkbox")
      .forEach((el) => (el.checked = isComplete));
  }

  return (
    <div className="container">
      <button onClick={() => toggleAllCompleted(1)}>Toggle All Complete</button>
      <button onClick={() => toggleAllCompleted(0)}>
        Toggle All Incomplete
      </button>

      <ul>
        {props.tasks.map((task) => (
          <li
            key={task.task_id}
            style={task.is_complete ? { opacity: 0.4 } : { opacity: 1 }}
          >
            <input
              className={task.isEditing ? "checkbox hidden" : "checkbox"}
              type="checkbox"
              defaultChecked={task.is_complete ? true : false}
              onClick={() => toggleCompleted(task.task_id, task.is_complete)}
            />
            <form
              className={
                task.isEditing ? "formEditTask" : "formEditTask hidden"
              }
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTask(
                  task.task_id,
                  e.target.querySelector("input").value
                );
              }}
            >
              <input
                type="text"
                className="inputEditTask"
                ref={(input) => input && input.focus()}
                defaultValue={task.task_text}
                onBlur={(e) => {
                  toggleIsEditing(task.task_id, props.tasks, false);
                  e.target.value = task.task_text;
                }}
                onKeyDown={(e) => {
                  if (e.code === "Escape") {
                    toggleIsEditing(task.task_id, props.tasks, false);
                    e.target.value = task.task_text;
                  }
                }}
              />
            </form>
            <p
              className={task.isEditing ? "task hidden" : "task"}
              onDoubleClick={() => {
                toggleIsEditing(task.task_id, props.tasks, true);
              }}
            >
              {task.task_text}
            </p>
            <div className="editdel">
              <VscEdit
                size={28}
                className={task.isEditing ? "edit hidden" : "edit"}
                onClick={() => {
                  toggleIsEditing(task.task_id, props.tasks, true);
                }}
              />
              <VscTrash
                size={28}
                className={task.isEditing ? "delete hidden" : "delete"}
                onClick={() => delTask(task.task_id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
