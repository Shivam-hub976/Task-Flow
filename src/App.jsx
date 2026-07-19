import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";

function App() {
  // Load tasks from localStorage
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
  const [searchTerm, setSearchTerm] = useState("");

  // Save tasks
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
  // Trims empty spaces from the start/end of the search term
  const cleanSearch = searchTerm.trim().toLowerCase();
  return tasks.filter((task) => 
    task.status === status && 
    task.text.toLowerCase().includes(cleanSearch)
  );
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        TaskFlow Board
      </h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="flex gap-3 mb-5"
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
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search tasks..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* To Do */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">
            📋 To Do
          </h2>

          {getTasksByStatus("To Do").length === 0 ? (
            <p className="text-gray-400 text-sm">
              No tasks found.
            </p>
          ) : (
            getTasksByStatus("To Do").map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleMoveTask={handleMoveTask}
                handleEditTask={handleEditTask}
              />
            ))
          )}
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">
            ⚡ In Progress
          </h2>

          {getTasksByStatus("In Progress").length === 0 ? (
            <p className="text-gray-400 text-sm">
              No tasks found.
            </p>
          ) : (
            getTasksByStatus("In Progress").map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleMoveTask={handleMoveTask}
                handleEditTask={handleEditTask}
              />
            ))
          )}
        </div>

        {/* Done */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">
            ✅ Done
          </h2>

          {getTasksByStatus("Done").length === 0 ? (
            <p className="text-gray-400 text-sm">
              No tasks found.
            </p>
          ) : (
            getTasksByStatus("Done").map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleMoveTask={handleMoveTask}
                handleEditTask={handleEditTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;