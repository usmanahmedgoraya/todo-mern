const express = require("express");
const router = express.Router()
const Todo = require("../model/todoModel")

// Create Todo
router.post('/todos', async (req, res) => {
  try {
    const { title, desc, completed } = req.body;
    if(title && desc){
      const todo = new Todo({ title, desc, completed });
      await todo.save();
    }
    res.status(200).json({todo});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Todos
router.get('/all-todos', async (req, res) => {
  try {
    const todos = await Todo.find({});
    if(todos){
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Todo
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, desc, completed }, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear All Todo
router.delete("/clear-todos", async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: 'All Todos deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Completed Todos
router.put("/complete-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let todo = await Todo.findById(id);

    // Update only the fields that need to be modified
    await Todo.updateOne({ _id: id }, { completed: !todo.completed });

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all completed tasks
router.delete("/clear-complete-todo", async (req, res) => {
  try {
    const completedTodos = await Todo.deleteMany({ completed: true })
    res.status(200).json({ msg: "All completed tasks deleted", completedTodos })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.get("/", (req, res) => {
  res.status(200).json({ msg: "Gas Mehngi" })
})


module.exports = router;