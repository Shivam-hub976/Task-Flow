import { useState } from "react";

function App() {
  // 1. STATE ARCHITECTURE
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Sprint 5 Docs", status: "Done" },
    { id: 2, text: "Build Add Task logic", status: "To Do" },
  ]);

  const [newTaskText, setNewTaskText] = useState("");

  // 2. ADD TASK LOGIC
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
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  // 3. DELETE TASK
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 4. MOVE TASK
  const handleMoveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // 5. FILTER TASKS
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">TaskFlow Board</h1>

      {/* ADD TASK FORM */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Task
        </button>
      </form>

      {/* BOARD */}
      <div className="grid grid-cols-3 gap-4">

        {/* TO DO */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-3">To Do</h2>

          {getTasksByStatus("To Do").map((task) => (
            <div
              key={task.id}
              className="mb-2 flex items-center justify-between"
            >
              <span>{task.text}</span>

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
          <h2 className="font-semibold mb-3">In Progress</h2>

          {getTasksByStatus("In Progress").map((task) => (
            <div
              key={task.id}
              className="mb-2 flex items-center justify-between"
            >
              <span>{task.text}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveTask(task.id, "To Do")}
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
                  onClick={() => handleMoveTask(task.id, "Done")}
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
          <h2 className="font-semibold mb-3">Done</h2>

          {getTasksByStatus("Done").map((task) => (
            <div
              key={task.id}
              className="mb-2 flex items-center justify-between"
            >
              <span>{task.text}</span>

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