// Import express and create a router
const express = require('express');
const router = express.Router();

// Import our Todo model
const Todo = require('../models/Todo');

// ================================
// ROUTE 1: GET all todos
// URL: GET /api/todos
// What it does: Returns all todos from database
// ================================
router.get('/', async (req, res) => {
  try {
    // Find ALL todos in database, newest first
    const todos = await Todo.find().sort({ createdAt: -1 });

    // Send them back as JSON
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting todos', error });
  }
});

// ================================
// ROUTE 2: POST - Create a new todo
// URL: POST /api/todos
// What it does: Creates a new todo in database
// ================================
router.post('/', async (req, res) => {
  try {
    // Get the title from the request body
    const { title } = req.body;

    // Make sure title is not empty
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Create a new todo using our model
    const newTodo = new Todo({
      title: title,
      completed: false
    });

    // Save it to the database
    const savedTodo = await newTodo.save();

    // Send back the saved todo
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
});

// ================================
// ROUTE 3: PUT - Update a todo
// URL: PUT /api/todos/:id
// What it does: Toggles completed status
// ================================
router.put('/:id', async (req, res) => {
  try {
    // Find the todo by its ID and update it
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true } // Return the updated todo
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
});

// ================================
// ROUTE 4: DELETE - Delete a todo
// URL: DELETE /api/todos/:id
// What it does: Removes a todo from database
// ================================
router.delete('/:id', async (req, res) => {
  try {
    // Find the todo by ID and delete it
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

// Export the router
module.exports = router;