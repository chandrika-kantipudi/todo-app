// Import mongoose - our tool for talking to MongoDB
const mongoose = require('mongoose');

// Define the shape/structure of a Todo
// Think of this as designing a form template
const todoSchema = new mongoose.Schema(
  {
    // The title field - must be text, and is required
    title: {
      type: String,
      required: true,
      trim: true // removes extra spaces
    },

    // The completed field - true or false, default is false
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically adds createdAt and updatedAt dates
    timestamps: true
  }
);

// Create the model from the schema
// Think of this as printing the form template
const Todo = mongoose.model('Todo', todoSchema);

// Export so other files can use it
module.exports = Todo;