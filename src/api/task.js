import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTasks = (user) => {
	return axios({
    method: "GET",
    url: apiUrl + "/tasks",
    headers: {
			Authorization: `Token token=${user?.token}`,
		},
  });
}

export const myTasks = (user) => {
  return axios({
    method: "GET",
    url: apiUrl + `/user/${user._id}`,
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};

export const singleTaskDetail = (task, user) => {
  return axios({
    method: "GET",
    url: apiUrl + `/tasks/${task.id}`,
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};
// axios.get(`http://localhost:8000/tasks/${id}`);