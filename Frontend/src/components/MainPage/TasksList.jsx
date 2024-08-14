import React from "react";
import {
  editTask,
  deleteTask,
  toggleComplete,
} from "../../App/utils/DbHelperFunctions";
import { VscTrash, VscEdit } from "react-icons/vsc";

const TasksList = (props) => {
  async function delTask(id, setTasks) {
    const tasksObj = await deleteTask(id, props.accessToken);
    const tasksArr = tasksObj.tasks;
    if (!tasksArr) {
      setTasks([]);
      return;
    }
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    setTasks(tasksArr);
  }

  function edtTask(id, tasks, setTasks) {
    const tasksClone = tasks.slice();
    tasksClone.find((task) => task.task_id === id).isEditing = !tasksClone.find(
      (task) => task.task_id === id
    ).isEditing;
    setTasks(tasksClone);
  }

  function editTaskInput(e, id, tasks, setTasks) {
    if (e.target.value === "") return;
    const tasksClone = tasks.slice();
    tasksClone.find((task) => task.task_id === id).task_text = e.target.value;
    setTasks(tasksClone);
  }

  async function handleEditTask(id, tasks, setTasks) {
    edtTask(id, tasks, setTasks);
    const task = tasks.find((el) => el.task_id === id).task_text;
    const tasksObj = await editTask(id, task, props.accessToken);
    const tasksArr = tasksObj.tasks;
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    setTasks(tasksArr);
  }

  async function toggleCompleted(id, isComplete, setTasks) {
    const tasksObj = await toggleComplete(id, isComplete, props.accessToken);
    const tasksArr = tasksObj.tasks;
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    setTasks(tasksArr);
  }

  return (
    <div className="container">
      <ul>
        {props.tasks.map((task) => (
          <li
            key={task.task_id}
            style={task.is_complete ? { opacity: 0.4 } : { opacity: 1 }}
          >
            <input
              className="checkbox"
              type="checkbox"
              defaultChecked={task.is_complete ? true : false}
              disabled={
                props.tasks.find((tsk) => tsk.task_id === task.task_id)
                  .isEditing
              }
              onClick={() =>
                toggleCompleted(task.task_id, task.is_complete, props.setTasks)
              }
            />
            <form
              className={
                props.tasks.find((tsk) => tsk.task_id === task.task_id)
                  .isEditing
                  ? "formEditTask"
                  : "formEditTask hidden"
              }
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTask(task.task_id, props.tasks, props.setTasks);
              }}
            >
              <input
                type="text"
                value={
                  props.tasks.find((el) => el.task_id === task.task_id)
                    .task_text
                }
                onChange={(e) =>
                  editTaskInput(e, task.task_id, props.tasks, props.setTasks)
                }
              />
              <button>Update</button>
            </form>
            <p
              className={
                props.tasks.find((tsk) => tsk.task_id === task.task_id)
                  .isEditing
                  ? "task hidden"
                  : "task"
              }
            >
              {task.task_text}
            </p>
            <div className="editdel">
              <VscEdit
                size={28}
                className="edit"
                onClick={() =>
                  props.tasks.find((tsk) => tsk.task_id === task.task_id)
                    .isEditing
                    ? ""
                    : edtTask(task.task_id, props.tasks, props.setTasks)
                }
              />
              <VscTrash
                size={28}
                className="delete"
                onClick={() =>
                  props.tasks.find((tsk) => tsk.task_id === task.task_id)
                    .isEditing
                    ? ""
                    : delTask(task.task_id, props.setTasks)
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
