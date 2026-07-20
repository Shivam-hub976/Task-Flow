import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './components/TaskCard';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow-data');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, text: "Completed Task", status: "Done", priority: "Low" },
      { id: 2, text: "Add New Task", status: "To Do", priority: "High" },
    ];
  });
  
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('taskflow-data', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') {
      alert('Task cannot be empty!');
      return; 
    }
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      status: 'To Do',
      priority: newTaskPriority
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskPriority('Medium');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId, newText) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const getTasksByStatus = (status) => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    return tasks.filter((task) => 
      task.status === status && 
      task.text.toLowerCase().includes(cleanSearch)
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      setTasks(prevTasks => prevTasks.map(task => 
        task.id.toString() === draggableId 
          ? { ...task, status: destination.droppableId } 
          : task
      ));
    }
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Modern unsplash header */}
      <header 
        className="w-full h-48 md:h-64 bg-cover bg-center relative flex items-center justify-center shadow-md"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-indigo-900/70"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            TaskFlow
          </h1>
          <p className="mt-2 text-indigo-100 md:text-lg font-medium drop-shadow">
            Enterprise Kanban Board
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 -mt-8 relative z-20">
        
        {/* Instructions banner */}
        <section className="bg-white rounded-xl shadow-lg p-5 mb-8 border-l-4 border-indigo-500">
          <h2 className="font-bold text-indigo-900 flex items-center gap-2 mb-2">
            <span>💡</span> Quick Guide
          </h2>
          <ul className="text-sm text-slate-600 list-disc list-inside space-y-1 md:flex md:space-y-0 md:gap-6 md:list-none md:list-inside-none">
            <li className="md:flex-1"><strong>Add Tasks:</strong> Type below and set your priority.</li>
            <li className="md:flex-1"><strong>Edit:</strong> Click directly on any task's text to modify it.</li>
            <li className="md:flex-1"><strong>Move:</strong> Click and drag cards between columns.</li>
          </ul>
        </section>

        {/* Add task and search controls */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          <form onSubmit={handleAddTask} className="lg:col-span-2 flex flex-col sm:flex-row gap-3">
            <label htmlFor="taskInput" className="sr-only">New Task Description</label>
            <input
              id="taskInput"
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?" 
              className="flex-1 p-3.5 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            
            <label htmlFor="prioritySelect" className="sr-only">Task Priority</label>
            <select 
              id="prioritySelect"
              value={newTaskPriority} 
              onChange={(e) => setNewTaskPriority(e.target.value)}
              className="p-3.5 rounded-lg border border-slate-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer sm:w-48"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            
            <button
              type="submit"
              aria-label="Add Task"
              className="px-6 py-3.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold shadow-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Add Task
            </button>
          </form>

          <div className="lg:col-span-1 relative">
            <label htmlFor="searchInput" className="sr-only">Search Tasks</label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search tasks..." 
              className="w-full p-3.5 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          
        </section>

        {/* Drag drop */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {columns.map(columnId => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <section 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    className={`bg-slate-100/80 p-4 md:p-5 rounded-2xl border border-slate-200 min-h-62.5 flex flex-col transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-indigo-50 border-indigo-200' : ''}`}
                  >
                    <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
                      {columnId} 
                      <span className="ml-2 text-sm font-medium bg-slate-200 text-slate-600 py-0.5 px-2 rounded-full">
                        {getTasksByStatus(columnId).length}
                      </span>
                    </h3>
                    
                    <div className="flex-1">
                      {getTasksByStatus(columnId).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.9 : 1,
                                transform: snapshot.isDragging 
                                  ? `${provided.draggableProps.style.transform} scale(1.02)` 
                                  : provided.draggableProps.style.transform,
                              }}
                            >
                              <TaskCard 
                                task={task} 
                                handleDeleteTask={handleDeleteTask} 
                                handleEditTask={handleEditTask} 
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </section>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;