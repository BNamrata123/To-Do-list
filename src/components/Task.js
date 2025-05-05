import React from 'react';
import './Task.css';

function Task({ task, toggleTaskCompletion, deleteTask }) {

  const handleDelete = (e) => {
    e.stopPropagation();  // Prevent the delete button click from triggering any other event
    deleteTask(task.id);  // Call the delete function passed from App.js with the task id
  };

  // Function to get priority class
  const getPriorityClass = () => {
    switch (task.priority) {
      case 'High':
        return 'high-priority';
      case 'Medium':
        return 'medium-priority';
      case 'Low':
        return 'low-priority';
      default:
        return '';
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityClass()}`}>
      <span
        onClick={() => toggleTaskCompletion(task.id)}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
      >
        {task.text}
      </span>
      {task.dueDate && (
        <span className="due-date">{`Due: ${task.dueDate}`}</span>
      )}
      <select className="priority-dropdown" value={task.priority}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button 
        onClick={handleDelete} 
        style={{ marginLeft: '10px', cursor: 'pointer' }}
      >
        ❌
      </button> 
    </li>
  );
}

export default Task;
