import React from "react";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/task";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../apiConfig";

const TasksIndex = (props) => {
  const { msgAlert, user } = props;
   const token = localStorage.getItem("token");
   const userId = JSON.parse(localStorage.getItem("user"));
  //preventing unauthorised users from accessing the page
   if (!token && !userId) {
     window.location.href = "./sign-in";
   }
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllTasks(user)
      .then((res) => {
        console.log("tasks===>", res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-md">
      <h1>Tasks Index</h1>
      {Array.isArray(tasks) ? (
        tasks.map((task, index) => (
          <div key={index} className="taskDetails">
            <Link to={`/task/detail/${task._id}`}>
              {/* <b>Task Title:</b> */}
              {task.title}
            </Link>
            <br />
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TasksIndex;