import { useState } from "react";

function TaskCard({ task, handleDeleteTask, handleEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

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

  const handleSave = () => {
    if (editText.trim() !== "") {
      handleEditTask(task.id, editText);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }

    if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`border-l-4 ${getPriorityBorder(
        task.priority
      )} bg-gray-50 rounded-lg p-3 mb-3 shadow-sm`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full px-2 py-1 text-sm rounded border-2 border-blue-400 focus:outline-none"
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className={`cursor-text hover:bg-gray-200 px-1 -ml-1 rounded transition ${
                task.status === "Done"
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
              title="Click to edit task"
            >
              {task.text}
            </p>
          )}

          <span className="text-xs text-gray-500">
            {task.priority} Priority
          </span>
        </div>

        <button
          onClick={() => handleDeleteTask(task.id)}
          className="text-red-500 text-sm hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;