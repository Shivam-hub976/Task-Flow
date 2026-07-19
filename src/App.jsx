import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-data");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: 1,
        text: "Review Sprint 5 Docs",
        status: "Done",
        priority: "Low",
      },
      {
        id: 2,
        text: "Build Add Task logic",
        status: "To Do",
        priority: "High",
      },
    ];
  });

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("taskflow-data", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTaskText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      status: "To Do",
      priority: newTaskPriority,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setNewTaskPriority("Medium");
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Move Task
  const handleMoveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Edit Task
  const handleEditTask = (taskId, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, text: newText }
          : task
      )
    );
  };

  // Filter Tasks
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-6">
        TaskFlow Board
      </h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="flex gap-3 mb-8"
      >
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={newTaskPriority}
          onChange={(e) =>
            setNewTaskPriority(e.target.value)
          }
          className="p-3 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Board */}
      <div className="grid grid-cols-3 gap-6">

        {/* To Do */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            To Do
          </h2>

          {getTasksByStatus("To Do").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleMoveTask={handleMoveTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            In Progress
          </h2>

          {getTasksByStatus("In Progress").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleMoveTask={handleMoveTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>

        {/* Done */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Done
          </h2>

          {getTasksByStatus("Done").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleMoveTask={handleMoveTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;