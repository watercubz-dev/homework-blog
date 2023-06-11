import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTaks } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTaks(task._id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
