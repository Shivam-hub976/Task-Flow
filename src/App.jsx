import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  // Delete
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit
  const handleEditTask = (taskId, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, text: newText }
          : task
      )
    );
  };

  // Search
  const getTasksByStatus = (status) => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return tasks.filter(
      (task) =>
        task.status === status &&
        task.text.toLowerCase().includes(cleanSearch)
    );
  };

  // Drag End
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id.toString() === draggableId
          ? {
              ...task,
              status: destination.droppableId,
            }
          : task
      )
    );
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        🚀 TaskFlow Board
      </h1>

      {/* Add Task */}
      <form
        onSubmit={handleAddTask}
        className="flex gap-3 mb-5"
      >
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={newTaskPriority}
          onChange={(e) =>
            setNewTaskPriority(e.target.value)
          }
          className="p-3 rounded-lg border border-gray-300 bg-white"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="🔍 Search tasks..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {columns.map((columnId) => (
            <Droppable
              droppableId={columnId}
              key={columnId}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl p-4 min-h-112.5 shadow-md transition-colors ${
                    snapshot.isDraggingOver
                      ? "bg-blue-100"
                      : "bg-white"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {columnId}
                  </h2>

                  {getTasksByStatus(columnId).map(
                    (task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              handleDeleteTask={
                                handleDeleteTask
                              }
                              handleEditTask={
                                handleEditTask
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

    </div>
  );
}

export default App;