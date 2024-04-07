import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTitle.trim() === '' || newDescription.trim() === '') return;
    setTasks([...tasks, { title: newTitle, description: newDescription, completed: false }]);
    setNewTitle('');
    setNewDescription('');
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newTitle = prompt('Edit task title', tasks[index].title);
    const newDescription = prompt('Edit task description', tasks[index].description);
    if (newTitle !== null && newTitle.trim() !== '' && newDescription !== null && newDescription.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index].title = newTitle.trim();
      updatedTasks[index].description = newDescription.trim();
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'not completed') {
      return tasks.filter(task => !task.completed);
    } else {
      return tasks;
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Todo title..."
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Todo description..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='filter'>
        Filter: 
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">not completed</option>
        </select>
      </div>
      <ul>
        {filteredTasks().map((task, index) => (
          <li key={index} className={task.completed ? 'complete' : ''}>
            <div>
              <p>task title:&nbsp;{task.title}</p>
              <p>task description:&nbsp;{task.description}</p>
            </div>status:
            <select
              value={task.completed ? 'completed' : 'not completed'}
              onChange={() => toggleComplete(index)}
            >
              <option value="completed">Completed</option>
              <option value="not completed">not complete</option>
            </select>
            <div>
            <button className="edit"onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
