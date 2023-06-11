import { createContext, useContext, useState } from "react";
import {
  createTasksRequests,
  getTasksRequests,
  deleteTasksRequests,
  getTaskRequests,
  updateTasksRequests,
} from "../api/tasks";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return context;
};

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequests();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTaks = async (taks) => {
    const res = await createTasksRequests(taks);
  };

  const deleteTaks = async (id) => {
    try {
      const res = await deleteTasksRequests(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  const getTask = async (id) => {
    try {
      const res = await getTaskRequests(id);
    return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequests(id, task);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTaks,
        getTasks,
        deleteTaks,
        getTask,
        updateTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
