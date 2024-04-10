import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { content: newTask, completed: false }]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map((task, index) => index === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((_, index) => index !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = filter === 'all'
      ? tasks
      : filter === 'active'
          ? tasks.filter((task) => !task.completed)
          : tasks.filter((task) => task.completed);

  return (
      <div className="container">
        <h1>#todo</h1>

        <div className="tabs">
          <button className={filter === 'all' ? "selected" : ""} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? "selected" : ""} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? "selected" : ""} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        {/* Conditional rendering based on filter state */}
        {filter !== 'completed' && (
            <div className="input-group">
              <input
                  type="text"
                  placeholder="Add new task"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      addTask(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
              />
              <button onClick={() => {
                const input = document.querySelector('.input-group input');
                if (input.value.trim()) {
                  addTask(input.value.trim());
                  input.value = '';
                }
              }}>Add</button>
            </div>
        )}

        {/* The TodoList component should be outside the conditional rendering block */}
        <TodoList
            tasks={filteredTasks}
            addTask={addTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
        />

        {/* Conditionally render the "Delete All" button for completed tasks */}
        {filter === 'completed' && (
            <div className="clear-all-container">
              <button className="clear-btn" onClick={clearCompleted}>
                <FontAwesomeIcon icon={faTrash} /> Delete All
              </button>
            </div>
        )}

      </div>
  );
}

export default App;
