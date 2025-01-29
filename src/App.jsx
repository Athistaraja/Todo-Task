import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';
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
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  const editTask = (index) => {
    const newTitle = prompt('Edit task title', tasks[index].title);
    const newDescription = prompt('Edit task description', tasks[index].description);
    if (newTitle !== null && newTitle.trim() !== '' && newDescription !== null && newDescription.trim() !== '') {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map((task, i) =>
          i === index ? { ...task, title: newTitle.trim(), description: newDescription.trim() } : task
        );
        return updatedTasks;
      });
    }
  };

  const deleteTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'not completed') return !task.completed;
    return true;
  });

  return (
    <div className="container my-4">
      <div className='header text-center py-3 bg-success text-white rounded'>
        <h1 className="h3 mb-0"><b>Todo List</b></h1>
      </div>
      <div className="row g-2 my-4">
        <div className="col-md-5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Todo title..."
            className="form-control"
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Todo description..."
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <button onClick={addTask} className="btn btn-primary w-100">Add Task</button>
        </div>
      </div>
      <div className="mb-3 d-flex justify-content-end">
        <label className="me-2">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select w-auto">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filteredTasks.map((task, index) => (
          <div key={index} className={`col ${task.completed ? 'bg-light' : ''}`}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title"><b>Task Title:</b> {task.title}</h5>
                <p className="card-text"><b>Task Description:</b> {task.description}</p>
                <div className="d-flex align-items-center mb-2">
                  <label className="me-2">Status:</label>
                  <select
                    value={task.completed ? 'completed' : 'not completed'}
                    onChange={() => toggleComplete(index)}
                    className="form-select w-auto"
                  >
                    <option value="completed">Completed</option>
                    <option value="not completed">Not Complete</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => editTask(index)}>
                    <FaEdit size={16} />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
