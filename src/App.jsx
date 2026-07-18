import { useState } from 'react';

function App() {
  // 1. STATE ARCHITECTURE
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Sprint 5 Docs", status: "Done" },
    { id: 2, text: "Build Add Task logic", status: "To Do" },
  ]);
  
  // New state to track the input field
  const [newTaskText, setNewTaskText] = useState('');

  // 2. ADD TASK LOGIC
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevents page reload
    
    // Sprint 4 Feedback: Prevent empty fields
    if (newTaskText.trim() === '') {
      alert('Task cannot be empty!');
      return; 
    }

    const newTask = {
      id: Date.now(), // Generates a unique ID
      text: newTaskText,
      status: 'To Do' // Defaults to the first column
    };

    // Update state: copy existing tasks and add the new one
    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear the input field
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
        TaskFlow Board
      </h1>

      {/* ADD TASK FORM */}
      <form onSubmit={handleAddTask} className="mb-8 flex gap-2 justify-center">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?" 
          className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition"
        >
          Add Task
        </button>
      </form>

      {/* 3-COLUMN UI ARCHITECTURE (Tailwind Grid restored) */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Column 1: To Do */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">To Do</h2>
          {getTasksByStatus("To Do").map((task) => (
            <div key={task.id} className="p-3 mb-3 bg-gray-100 rounded-lg border-l-4 border-blue-500">
              {task.text}
            </div>
          ))}
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">In Progress</h2>
          {getTasksByStatus("In Progress").map((task) => (
            <div key={task.id} className="p-3 mb-3 bg-gray-100 rounded-lg border-l-4 border-yellow-500">
              {task.text}
            </div>
          ))}
        </div>

        {/* Column 3: Done */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Done</h2>
          {getTasksByStatus("Done").map((task) => (
            <div key={task.id} className="p-3 mb-3 bg-gray-100 rounded-lg border-l-4 border-green-500">
              {task.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;