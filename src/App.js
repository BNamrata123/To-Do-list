import React, { useState, useEffect } from 'react';
import './App.css';
import Task from './components/Task';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState(""); // New state for due date
  const [priority, setPriority] = useState(""); // New state for priority
  const [darkMode, setDarkMode] = useState(false);

  // Load saved tasks on page load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: uuidv4(),
        text: taskInput,
        completed: false,
        dueDate: dueDate,
        priority: priority, // Save the priority level with the task
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setDueDate("");
      setPriority("low");  // Reset priority to low after adding task
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  // Function to check if a task is overdue
  const isOverdue = (taskDueDate) => {
    if (!taskDueDate) return false; // If no due date, it's not overdue
    return new Date(taskDueDate) < new Date(); // Check if the due date is in the past
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="left-design"></div>
<div className="right-design"></div>

      <h1>To-Do List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due date"
      />
      <button onClick={addTask}>Add</button>

      <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: "10px" }}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <button
  onClick={clearAllTasks}
  style={{
    backgroundColor: "red",
    color: "white", // 👈 makes text visible on red background
    marginLeft: "10px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  Clear All
</button>

      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
            isOverdue={isOverdue(task.dueDate)} // Pass overdue status to Task component
            priority={task.priority} // Pass priority to Task component
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
