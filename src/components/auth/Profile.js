import React from "react";
import { useEffect, useState } from "react";
import { MyTasks } from "../../api/task";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../apiConfig";

const Profile = (props) => {
  const [wellnessData, setWellnessData] = useState([]);
  const [mindfullnessData, setMindfulnessdata] = useState([]);
  const [breathData, setBreathData] = useState([]);
  const [stressData, setStressData] = useState([])
  const { msgAlert, user } = props;
  const token = localStorage.getItem("token");
  //preventing unauthorised users from accessing the page
  // if (!token && !userId) {
  //   window.location.href = "./sign-in";
  // }

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    MyTasks(user)
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
      
      {(tasks.length > 0) ? (
      <div className="data">
        <div id="mindfullness" className="cat">
          <h2>Mindfullness</h2>
          <ul>
            {mindfullnessData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>
               <p><b>Title: </b>   {task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <b>Completed: </b><span>{task.completed == true ? <input type='checkbox' checked/>: <input type ="checkbox" />}</span>
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
                <Link to={`/task/${task._id}`}> 
                <p><b>Title: </b>   {task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <b>Completed: </b><span>{task.completed == true ? <input type='checkbox' checked/>: <input type ="checkbox" />}</span></Link>
               
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
                <p><b>Title: </b>   {task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <b>Completed: </b><span>{task.completed == true ? <input type='checkbox' checked/>: <input type ="checkbox" />} </span></Link>
                <br />
              </li>
            ))}
          </ul>
        </div>

        <div id="wellness" className="cat">
          <h2>General Wellness</h2>
          <ul>
            {wellnessData?.map((task, index) => (
              <li key={index} className="taskDetails">
                <Link to={`/task/${task._id}`}>
                <p><b>Title: </b>   {task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <b>Completed: </b><span>{task.completed == true ? <input type='checkbox' checked/>: <input type ="checkbox" />} </span></Link>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
)
            :(
              <p>No Tasks available</p>
            )}
    </div>
  );
};
export default Profile;
