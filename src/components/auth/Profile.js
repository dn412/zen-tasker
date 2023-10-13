
import React from "react";
import { useEffect, useState } from "react";
import { myTasks } from "../../api/task";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../apiConfig";

const Profile = (props) => {
  const { msgAlert, user } = props;
//   const token = localStorage.getItem("token");
//   const userId = JSON.parse(localStorage.getItem("user"));
//   //preventing unauthorised users from accessing the page
//   if (!token && !userId) {
//     window.location.href = "./sign-in";
//   }
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    myTasks(user)
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
      <h1>My Tasks</h1>
      {Array.isArray(tasks) ? (
        tasks.map((task, index) => (
          <div key={index} className="taskDetails">
            <Link to={`/task/${task._id}`}>
              {/* <b>Task Title:</b> */}
              {task.text}
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

export default Profile;
