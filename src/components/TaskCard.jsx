import { useState } from 'react';

function TaskCard({ task, handleDeleteTask, handleEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Upgraded Color Palette for modern UI and Lighthouse contrast requirements
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-500 bg-red-50 text-red-700';
      case 'Medium': return 'border-amber-500 bg-amber-50 text-amber-700';
      case 'Low': return 'border-emerald-500 bg-emerald-50 text-emerald-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      handleEditTask(task.id, editText);
    } else {
      setEditText(task.text); // Revert on empty save
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  // Split the styles to apply border to the card, and background/text to the priority pill
  const priorityClasses = getPriorityStyles(task.priority).split(' ');
  const borderClass = priorityClasses[0];
  const pillClasses = `${priorityClasses[1]} ${priorityClasses[2]}`;

  return (
    <div className={`p-4 mb-4 rounded-xl border-l-4 ${borderClass} bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group`}>
      <div className="flex justify-between items-start gap-3 mb-3">
        
        {/* Inline editing */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit task text"
            className="flex-1 px-3 py-1.5 text-sm rounded-md border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
          />
        ) : (
          <span 
            onClick={() => setIsEditing(true)} 
            className={`text-gray-800 text-sm md:text-base cursor-text hover:bg-indigo-50 px-1 -ml-1 rounded transition-colors duration-200 wrap-break-word ${task.status === 'Done' ? 'line-through text-gray-400' : ''}`}
            title="Click to edit task"
          >
            {task.text}
          </span>
        )}
        
        {/* Priority Pill */}
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${pillClasses}`}>
          {task.priority}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end border-t border-gray-100 pt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => handleDeleteTask(task.id)} 
          aria-label={`Delete task: ${task.text}`}
          className="text-red-500 text-sm hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded font-medium transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;