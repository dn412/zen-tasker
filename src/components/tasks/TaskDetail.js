import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const TaskDetail = (props) => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();
  const { user } = props;
  useEffect(() => {
    // retrieve a single task with an axios call
    axios
      .get(`http://localhost:8000/tasks/${id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTaskData(res.data.task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  //delete rask making axios fetch to api
  const deleteTask = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/tasks/${idFromBelow}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => navigate("/profile"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    // display the task details
    <div className="taskData-component">
      <h2>Title: {taskData.title}</h2>
      <p>Description: {taskData.description}</p>
      {(taskData.owner == user._id) &&
      (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/edit/${taskData._id}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteTask(taskData._id)}
        >
          Delete
        </button>
      </div>
      )}
    </div>
  );
};

export default TaskDetail;
