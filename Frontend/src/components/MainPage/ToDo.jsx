import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import AddTask from "./AddTask";
import TasksList from "./TasksList";
import "./Tasks.css";
import { getTasksFromDB } from "../../App/utils/DbHelperFunctions";

const ToDo = ({ deleteToken }) => {
  const userId = JSON.parse(localStorage.getItem("token")).userId;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function initPage() {
      try {
        const tasksObj = await getTasksFromDB(userId);
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
  }, [userId]);

  return (
    <>
      <AddTask setTasks={setTasks} userId={userId} />
      <TasksList tasks={tasks} setTasks={setTasks} userId={userId} />
      <Logout deleteToken={deleteToken} />
    </>
  );
};

export default ToDo;
