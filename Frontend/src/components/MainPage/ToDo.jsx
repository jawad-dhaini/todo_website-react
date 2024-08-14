import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import AddTask from "./AddTask";
import TasksList from "./TasksList";
import "./Tasks.css";
import { getTasksFromDB } from "../../App/utils/DbHelperFunctions";

const ToDo = ({ deleteToken }) => {
  const accessToken = JSON.parse(localStorage.getItem("token")).accessToken;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function initPage() {
      try {
        const tasksObj = await getTasksFromDB(accessToken);
        const tasksArr = tasksObj.tasks;
        if (!tasksArr) return;
        tasksArr.forEach((el) => {
          el.isEditing = false;
        });
        setTasks(tasksArr);
      } catch (err) {
        console.error(err);
      }
    }
    initPage();
  }, [accessToken]);

  return (
    <>
      <AddTask setTasks={setTasks} accessToken={accessToken} />
      <TasksList tasks={tasks} setTasks={setTasks} accessToken={accessToken} />
      <Logout deleteToken={deleteToken} />
    </>
  );
};

export default ToDo;
