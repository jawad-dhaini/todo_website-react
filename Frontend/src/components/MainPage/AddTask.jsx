import React, { useState } from "react";
import { addTask } from "../../App/utils/DbHelperFunctions";

const AddTask = (props) => {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.querySelector("input").value === "") return;
    props.taskHandle(addTask, inputValue, props.accessToken);
    setInputValue("");
  }

  return (
    <div className="container">
      <form className="formAddTask" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTask;
