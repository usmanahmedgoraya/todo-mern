const mongoose = require('mongoose');
const { Schema } = mongoose;

// * Creation of Notes Schema
const notesSchema = new mongoose.Schema({

    title: {
        type: String,
    },

    description: {
        type: String
    },

    Completed:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// * Creation of model
const Todo = mongoose.model('Todo', notesSchema);
module.exports = Todo;