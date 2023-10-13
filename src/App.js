// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import TasksIndex from "./components/tasks/TasksIndex";
import ChangePassword from "./components/auth/ChangePassword";
 import Profile from "./components/auth/Profile";
 import TaskDetail from "./components/auth/TaskDetail";
import UpdateTask from './components/auth/UpdateTask'
import jwtDecode from "jwt-decode";

const App = () => {
  const [user, setLoginUser] = useState({});
  const [msgAlerts, setMsgAlerts] = useState([]);
  const [token, setToken] = useState("");
  console.log("user in app", user);
  console.log("message alerts", msgAlerts);

  const setUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      const usertoken = jwtDecode(jwt);
      const loginuser = JSON.parse(localStorage.getItem("user"));
      setLoginUser(loginuser);
      setToken(usertoken);
    } catch (ex) {}
  };

  useEffect(() => {
    setUser();
    console.log(user);
  }, [setLoginUser]);

  const clearUser = () => {
    console.log("clear user ran");
    setLoginUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setLoginUser={setLoginUser} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn msgAlert={msgAlert} setLoginUser={setLoginUser} />}
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
         <Route
          path="/profile"
          element={
            <RequireAuth user={user}>
              <Profile msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/task/:id"
          element={
            <RequireAuth user={user}>
              <TaskDetail user={user} msgAlert={msgAlert} />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RequireAuth user={user}>
              <UpdateTask user={user} msgAlert={msgAlert} />
            </RequireAuth>
          }
        /> 
        <Route
          path="/tasks-index"
          element={
            <RequireAuth user={user}>
              <TasksIndex
                msgAlert={msgAlert}
                user={user}
                setLoginUser={setLoginUser}
              />
            </RequireAuth>
          }
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;
