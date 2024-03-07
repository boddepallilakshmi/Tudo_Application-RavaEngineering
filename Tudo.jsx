import React, { useState, useEffect } from 'react';
import './App.css';
import { FaCheckCircle, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const TodoList = ({ todos, onDelete, onUpdate, onEdit, onSave, onCancel, editingId }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {editingId === todo.id ? (
            <div className="todo-content">
              <input
                type="text"
                value={todo.title}
                onChange={e => onUpdate(todo.id, e.target.value)}
                className="edit-input"
              />
              <div className="edit-actions">
                <button onClick={() => onSave(todo.id)} className="save-btn">
                  <FaSave />
                </button>
                <button onClick={() => onCancel()} className="cancel-btn">
                  <FaTimes />
                </button>
              </div>
            </div>
          ) : (
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onUpdate(todo.id, todo.title, !todo.completed)}
                className="checkbox"
              />
              <span className="todo-text">{todo.title}</span>
              <div className="actions">
                <button onClick={() => onEdit(todo.id)} className="edit-btn">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(todo.id)} className="delete-btn">
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ onFilter }) => {
  return (
    <div className="filter">
      <label>
        <input
          type="checkbox"
          onChange={e => onFilter(e.target.checked)}
          className="filter-checkbox"
        />
        Show Completed
      </label>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data.slice(0, 10))); // Fetching first 10 todos
  }, []);

  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdate = (id, title, completed) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title, completed } : todo
      )
    );
  };

  const handleEdit = id => {
    setEditingId(id);
  };

  const handleSave = id => {
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  return (
    <div className="app-container">
      <div className="app">
        <h1 className="app-title">Company Todo List</h1>
        <Filter onFilter={setShowCompleted} />
        <TodoList
          todos={filteredTodos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          editingId={editingId}
        />
      </div>
    </div>
  );
};

export default App;
