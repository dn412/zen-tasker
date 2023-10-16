import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = (props) => {
  const { msgAlert, user } = props;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"));
  const Navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    // check if user is logged in
    if (token && user) {
      // create a task by fetching the api
      fetch("http://localhost:8000/tasks", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // Authorization: user.token, authorize user
        },
        body: JSON.stringify({
          task: {
            title,
            description,
            category,
            completed,
          },
        }),
      })
        .then((res) => {
          setTitle("");
          setDescription("");

        }).then(
        () => Navigate('/profile'))
        .catch((err) => {

          console.log(err);
        });
    } else {
      // if user is not logged in, redirect to sign-in page
      Navigate('/sign-in')

    }
  };
  return (
    <div className="create-form">
      <h2>Fill the form below to add a new Task</h2>
      <form onSubmit={submitHandler}>
        <div className="form-fields">
          <label for="task-select">Select a Task: </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
            type="text"
            required={true}
          >
            <option value="default" selected>
              Select a Category
            </option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Stress Relief">Stress Relief</option>
            <option value="Breathwork">Breathwork</option>
            <option value="General Wellness">General Wellness</option>
          </select>
        </div>
        <div className="form-fields">
          <label>Title: </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            type="text"
            required={true}
          />
        </div>

        <div className="form-fields ">
          <label>Description: </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            type="text"
            required={true}
            minLength={5}
          />
        </div>

        <div className="form-fields form-fields-check">
          <label>Completed: </label>
          <input
            type="checkbox"
            checked={completed}
            value={completed}
            onChange={(e) => setCompleted(e.currentTarget.checked)}
          />
        </div>
        <br />
        { }
        <input className="submit-input" type="submit" value="Create" />
      </form>
    </div>
  );
};
export default CreateTask;
