import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateTask = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [headerTitle, setHeaderTitle] = useState('')
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get(`http://localhost:8000/tasks/${id}`, {
        headers: {
          Authorization: `Token token=${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.task.title);
        setText(res.data.task.text);
        setHeaderTitle(res.data.task.title);
      })
      .catch((err) => console.log(err));
  }, []);

  const {user} = props
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:8000/tasks/${id}`, {
        headers: {
          "Content-type": "application/json", 
          Accept: "application/json, text/plain, */*",
          Authorization: `Token token=${user.token}`,
        },
        body: JSON.stringify({
          task: {
            title,
            text,
          },
        }),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.task);
        navigate(`/user/${user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <header>Edit {headerTitle}</header>

      <form onSubmit={submitHandler}>
        <div className="form-fields">
          <label>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            type="text"
          />
        </div>

        <br />

        <div className="form-fields">
          <label>Text</label>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            name="text"
            type="text"
          />
        </div>

        <br />
        {}
        <input class="submit-input" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateTask;
