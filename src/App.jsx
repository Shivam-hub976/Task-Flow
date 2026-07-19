import { useState, useEffect } from "react";

function App() {
  // STATE
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

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("taskflow-data", JSON.stringify(tasks));
  }, [tasks]);

  // ADD TASK
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

  // DELETE TASK
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // MOVE TASK
  const handleMoveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // FILTER TASKS
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  // PRIORITY COLORS
  const getPriorityBorder = (priority) => {
    switch (priority) {
      case "High":
        return "border-red-500";
      case "Medium":
        return "border-yellow-500";
      case "Low":
        return "border-green-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-6">
        TaskFlow Board
      </h1>

      {/* ADD TASK FORM */}
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
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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

      {/* BOARD */}
      <div className="grid grid-cols-3 gap-6">

        {/* TO DO */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">To Do</h2>

          {getTasksByStatus("To Do").map((task) => (
            <div
              key={task.id}
              className={`border-l-4 ${getPriorityBorder(
                task.priority
              )} bg-gray-50 p-3 rounded mb-3 flex justify-between items-center`}
            >
              <div>
                <p className="font-medium">{task.text}</p>
                <span className="text-xs text-gray-500">
                  {task.priority} Priority
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    handleMoveTask(task.id, "In Progress")
                  }
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Start →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            In Progress
          </h2>

          {getTasksByStatus("In Progress").map((task) => (
            <div
              key={task.id}
              className={`border-l-4 ${getPriorityBorder(
                task.priority
              )} bg-gray-50 p-3 rounded mb-3 flex justify-between items-center`}
            >
              <div>
                <p className="font-medium">{task.text}</p>
                <span className="text-xs text-gray-500">
                  {task.priority} Priority
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleMoveTask(task.id, "To Do")
                  }
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  ← Back
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    handleMoveTask(task.id, "Done")
                  }
                  className="text-green-600 text-sm hover:text-green-800"
                >
                  Finish →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DONE */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Done
          </h2>

          {getTasksByStatus("Done").map((task) => (
            <div
              key={task.id}
              className={`border-l-4 ${getPriorityBorder(
                task.priority
              )} bg-gray-50 p-3 rounded mb-3 flex justify-between items-center`}
            >
              <div>
                <p className="font-medium">{task.text}</p>
                <span className="text-xs text-gray-500">
                  {task.priority} Priority
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleMoveTask(task.id, "In Progress")
                  }
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  ← Revert
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;