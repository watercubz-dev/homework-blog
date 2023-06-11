import axios from "./axios";

export const getTasksRequests = () => axios.get(`/tasks`);

export const getTaskRequests = (id) => axios.get(`/tasks/${id}`);

export const createTasksRequests = (task) => axios.post(`/tasks`, task);

export const updateTasksRequests = (id,task) =>
  axios.put(`/tasks/${id}`, task);

export const deleteTasksRequests = (id) => axios.delete(`/tasks/${id}`);
