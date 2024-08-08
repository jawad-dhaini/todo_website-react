import React from "react";
import {
  editTask,
  deleteTask,
  toggleComplete,
} from "../../App/utils/DbHelperFunctions";

const TasksList = (props) => {
  async function delTask(id, setTasks) {
    const tasksObj = await deleteTask(id, props.userId);
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
    const tasksObj = await editTask(id, task, props.userId);
    const tasksArr = tasksObj.tasks;
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    setTasks(tasksArr);
  }

  async function toggleCompleted(id, is_complete, setTasks) {
    const tasksObj = await toggleComplete(id, is_complete, props.userId);
    const tasksArr = tasksObj.tasks;
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    setTasks(tasksArr);
  }

  return (
    <ul>
      {props.tasks.map((task) => (
        <li
          key={task.task_id}
          style={task.is_complete ? { opacity: 0.4 } : { opacity: 1 }}
        >
          <form
            className={
              props.tasks.find((tsk) => tsk.task_id === task.task_id).isEditing
                ? ""
                : "hidden"
            }
            onSubmit={(e) => {
              e.preventDefault();
              handleEditTask(task.task_id, props.tasks, props.setTasks);
            }}
          >
            <input
              type="text"
              placeholder="Enter your task"
              value={
                props.tasks.find((el) => el.task_id === task.task_id).task_text
              }
              onChange={(e) =>
                editTaskInput(e, task.task_id, props.tasks, props.setTasks)
              }
            />
            <button>Update Task</button>
          </form>
          <p
            className={
              props.tasks.find((tsk) => tsk.task_id === task.task_id).isEditing
                ? "hidden"
                : ""
            }
          >
            {task.task_text}
          </p>
          <button
            disabled={
              props.tasks.find((tsk) => tsk.task_id === task.task_id).isEditing
            }
            onClick={() =>
              toggleCompleted(task.task_id, task.is_complete, props.setTasks)
            }
          >
            {task.is_complete ? "Completed" : "Incomplete"}
          </button>
          <button
            disabled={
              props.tasks.find((tsk) => tsk.task_id === task.task_id).isEditing
            }
            onClick={() => edtTask(task.task_id, props.tasks, props.setTasks)}
          >
            Edit
          </button>
          <button
            disabled={
              props.tasks.find((tsk) => tsk.task_id === task.task_id).isEditing
            }
            onClick={() => delTask(task.task_id, props.setTasks)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
