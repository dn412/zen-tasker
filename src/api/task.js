import apiUrl from "../apiConfig";
import axios from "axios";


// retrieve all tasks by a single user
export const MyTasks = (user) => {
  return axios({
    method: "GET",
    url: apiUrl + `/user/${user._id}`,
    headers: {
      Authorization: user.token,
    },
  });
};

// get a single task detail
export const singleTaskDetail = (task, user) => {
  return axios({
    method: "GET",
    url: apiUrl + `/tasks/${task.id}`,
    headers: {
      Authorization: user.token,
    },
  });
};

