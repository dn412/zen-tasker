import React from "react";
import { useEffect, useState } from "react";
import RequireAuth from "../shared/RequireAuth";
import axios from "axios";
import CreateTask from "./CreateTask";
const TasksIndex = (props) => {
  const [wellnessData, setWellnessData] = useState([]);
  const [mindfullnessData, setMindfulnessdata] = useState([]);
  const [breathData, setBreathData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [stressData, setStressData] = useState([]);
  const [isButtonVisible, SetIsButtonVisible] = useState(true);
  const token = localStorage.getItem("token");

  // Function to toggle the form's visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    SetIsButtonVisible(!isButtonVisible);
  };

  const { msgAlert, user } = props;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // retrieve all example tasks from the json file
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json"); // Fetch the JSON file from the public folder
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Filter the data to group them by category
    let wellnessCat = tasks?.find(
      (item) => item.category === "General Wellness Tasks"
    );
    let mindCat = tasks?.find((item) => item.category === "Mindfulness Tasks");
    let stressCat = tasks?.find(
      (item) => item.category === "Stress Relief Tasks"
    );
    let breathCat = tasks?.find((item) => item.category === "Breathwork Tasks");

    // set the filtered data to their sttate
    setMindfulnessdata(mindCat);
    setWellnessData(wellnessCat);
    setBreathData(breathCat);
    setStressData(stressCat);
  }, [tasks]);
  return (
    <div className="container-fluid text-center ml-3">
      <br />
      {/* open the form when button is clicked */}
      {isButtonVisible && (
        <button className="btn btn-success" onClick={toggleForm}>
          Add New Task
        </button>
      )}
      {/* hide the button when form is visible */}
      {isFormOpen && (
        <RequireAuth user={user}>
          <CreateTask user={user} msgAlert={msgAlert} />
        </RequireAuth>
      )}
      <br />
      <br />
      {tasks && (
        <div className="data">
          <div className="row ml-2">
            <div id="mindfullness" className="col-md-3 cat">
              <h2>Mindfullness</h2>
              <ul>
                {/* ?map the data to a list */}
                {mindfullnessData?.details?.map((task, index) => (
                  <li key={index} className="taskDetails">
                    <strong>Title: </strong> {task.title}
                    <br />
                    <strong>Description: </strong>
                    {task.description}
                    <br />
                  </li>
                ))}
              </ul>
            </div>

            <div id="stress-relief" className="col-md-3 cat">
              <h2>Stress Relief Tasks</h2>
              <ul>
                {/* ?map the data to a list */}

                {stressData?.details?.map((task, index) => (
                  <li key={index} className="taskDetails">
                    <strong>Title: </strong> {task.title}
                    <br />
                    <strong>Description: </strong>
                    {task.description}
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div id="breath" className="col-md-3 cat">
              <h2>Breathwork</h2>
              <ul>
                  {/* ?map the data to a list */}
                {breathData?.details?.map((task, index) => (
                  <li key={index} className="taskDetails">
                    <strong>Title: </strong> {task.title}
                    <br />
                    <strong>Description: </strong>
                    {task.description}
                    <br />
                  </li>
                ))}
              </ul>
            </div>

            <div id="general-wellness" className="col-md-3 cat">
              <h2>General Wellness</h2>
              <ul>
                  {/* ?map the data to a list */}
                {stressData?.details?.map((task, index) => (
                  <li key={index} className="taskDetails">
                    <strong>Title: </strong> {task.title}
                    <br />
                    <strong>Description: </strong>
                    {task.description}
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksIndex;
