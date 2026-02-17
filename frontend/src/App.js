import React, { useState, useEffect } from 'react';
import './App.css';

// The URL of our backend API
const API_URL = 'https://todo-app-117y.onrender.com/api/todos';


function App() {
  // State - think of these as variables that React watches
  // When they change, React automatically updates the screen
  const [todos, setTodos] = useState([]);       // List of todos
  const [input, setInput] = useState('');        // Input box value
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');        // Error message

  // useEffect - runs when the page first loads
  useEffect(() => {
    fetchTodos();
  }, []);

  // FUNCTION 1: Get all todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // FUNCTION 2: Add a new todo
  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: input })
      });

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setInput('');
    } catch (err) {
      setError('Could not add todo. Please try again.');
    }
  };

  // FUNCTION 3: Toggle todo complete/incomplete
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      });

      const updatedTodo = await response.json();
      setTodos(todos.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Could not update todo. Please try again.');
    }
  };

  // FUNCTION 4: Delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Could not delete todo. Please try again.');
    }
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="app">
      <h1>📝 My Todo App</h1>

      {/* Input box and Add button */}
      <div className="input-container">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Show error if any */}
      {error && <p className="error">{error}</p>}

      {/* Show loading, empty message, or todo list */}
      {loading ? (
        <p className="loading">Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="empty-message">No todos yet! Add one above ☝️</p>
      ) : (
        <div className="todo-list">
          {todos.map(todo => (
            <div key={todo._id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id, todo.completed)}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;