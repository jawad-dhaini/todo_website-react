import React, { useState } from "react";
import { addTask } from "../../App/utils/DbHelperFunctions";

const AddTask = (props) => {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;
    const tasksObj = await addTask(inputValue, props.userId);
    const tasksArr = tasksObj.tasks;
    tasksArr.forEach((el) => {
      el.isEditing = false;
    });
    props.setTasks(tasksArr);
    setInputValue("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Add Task</button>
      </form>
    </>
  );
};

export default AddTask;
