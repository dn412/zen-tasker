import React from "react";
import { useEffect, useState } from "react";
import { allTasks } from "../../api/task";
import { Link } from "react-router-dom";
import RequireAuth from "../shared/RequireAuth";
import axios from "axios";
import apiUrl from "../../apiConfig";
import CreateTask from "./CreateTask";
const TasksIndex = (props) => {
  const [wellnessData, setWellnessData] = useState([]);
  const [mindfullnessData, setMindfulnessdata] = useState([]);
  const [breathData, setBreathData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [stressData, setStressData] = useState([])
  const [isButtonVisible, SetIsButtonVisible] = useState(true);
  // Function to toggle the form's visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    SetIsButtonVisible(!isButtonVisible);
  };

  const { msgAlert, user } = props;
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"));
  //preventing unauthorised users from accessing the page
  if (!token && !userId) {
    window.location.href = "./sign-in";
  }
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    allTasks(user)
      .then((res) => {
        console.log("tasks===>", res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 
  useEffect(() => {
    // Filter the data when the selected category changes
    let wellnessCat = tasks?.filter((item) => item.category === "General Wellness");
    let mindCat = tasks?.filter((item) => item.category === "Mindfulness");
    let stressCat = tasks?.filter((item) => item.category === "Stress Relief");
    let breathCat = tasks?.filter((item) => item.category === "Breathwork");
    setMindfulnessdata(mindCat);
    setWellnessData(wellnessCat);
    setBreathData(breathCat);
    setStressData(stressCat)
  }, [tasks]);
  return (
    <div className="container-md text-center">
      {/* <h1>Tasks Index</h1> */}
      <br />
      {isButtonVisible && (
        <button className="btn btn-success" onClick={toggleForm}>
          Add New Task
        </button>
      )}

      {isFormOpen && (
        <RequireAuth user={user}>
          <CreateTask user={user} />
        </RequireAuth>
      )}
      <br />
      <br />
      {tasks?.length && (
      <div className="data">
        <div id="mindfullness" className="cat">
          <h2>Mindfullness</h2>
          <ul>
            {mindfullnessData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>
                  {/* <b>Task Title:</b> */}
                  {task.description}
                </Link>
                <br />
              </li>
            ))}
          </ul>
        </div>

        <div id="stress" className="cat">
          <h2>Stress Relief</h2>
          <ul>
            {stressData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>{task.description}</Link>
                <br />
              </li>
            ))}
          </ul>
        </div>
          
        <div id="breath" className="cat">
          <h2>Breathwork</h2>
          <ul>
            {breathData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>
                  {/* <b>Task description:</b> */}
                  {task.description}
                </Link>
                <br />
              </li>
            ))}
          </ul>
        </div>

        <div id="welless" className="cat">
          <h2>General Wellness</h2>
          <ul>
            {wellnessData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>{task.description}</Link>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export default TasksIndex;
