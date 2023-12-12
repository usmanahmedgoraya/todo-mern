const express = require('express');
const router = express.Router();
const Notes = require('../Models/NotesModel');

// * Create a new Notes document
router.post('/create-notes', async (req, res) => {
    try {

        const createdNotes = new Notes({
            ...req.body
        });

        await createdNotes.save();
        console.log(new Date().toLocaleString() + ' ' + 'Creating Notes...');

        res.status(201).json({ status: true, message: "Notes document created successfully", data: createdNotes });
        console.log(new Date().toLocaleString() + ' ' + 'Create Notes Document Successfully!');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating Notes document', error: error.message });
    }
});

// * Get all Completed Notes documents
router.get('/get-all-notes-completed', async (req, res) => {
    try {
        const completedNotes = await Notes.find({ Completed: true });

        if (!completedNotes || completedNotes.length === 0) {
            console.log('Completed notes not found');
            return res.status(404).json({ message: 'Completed notes not found' });
        }

        const total = await Notes.find({ Completed: true }).countDocuments();
        console.log('Completed notes retrieved successfully');
        res.status(200).json({ status: true, data: completedNotes, total });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting completed notes', error: error.message });
    }
});

// * Get all Active Notes documents
router.get('/get-all-notes-active', async (req, res) => {
    try {
        const activeNotes = await Notes.find({ Completed: false });

        if (!activeNotes || activeNotes.length === 0) {
            console.log('Active notes not found');
            return res.status(404).json({ message: 'Active notes not found' });
        }

        console.log('Active notes retrieved successfully');
        res.status(200).json({ status: true, data: activeNotes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting active notes', error: error.message });
    }
});

// * Get all Notes documents
router.get('/get-all-notes', async (req, res) => {
    try {
        const notes = await Notes.find();
        if (!notes) {
            console.log('Notes documents not found');
            return res.status(404).json({ message: 'Notes not found' });
        }

        console.log('Notes documents retrieved successfully');
        res.status(200).json({ status: true, data: notes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting Notes documents', error: error.message });
    }
});

// * Get a Notes document by ID
router.get('/get-notes/:notesId', async (req, res) => {
    try {
        const notesId = req.params.notesId;
        const notes = await Notes.findById(notesId);

        if (!notes) {
            console.log(`Notes document with ID: ${notesId} not found`);
            return res.status(404).json({ message: `Notes document with ID: ${notesId} not found` });
        }

        console.log(`Notes document with ID: ${notesId} retrieved successfully`);
        res.status(200).json({ status: true, data: notes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting Notes document', error: error.message });
    }
});

// * Update a Notes document by ID
router.put('/update-notes/:notesId', async (req, res) => {
    try {
        const notesId = req.params.notesId;
        const updates = req.body;

        const updatedNotes = await Notes.findByIdAndUpdate(notesId, updates, { new: true });

        if (!updatedNotes) {
            console.log(`Notes document with ID: ${notesId} not found`);
            return res.status(404).json({ status: false, message: `Notes document with ID: ${notesId} not found` });
        }

        console.log(`Notes document with ID: ${notesId} updated successfully`);
        res.status(200).json({ status: true, message: 'Notes document updated successfully', data: updatedNotes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error updating Notes document', error: error.message });
    }
});

// * Delete a Notes document by ID
router.delete('/delete-notes/:notesId', async (req, res) => {
    try {
        const notesId = req.params.notesId;
        const deletedNotes = await Notes.findByIdAndDelete(notesId);

        // if (!deletedNotes) {
        //     console.log(`Notes document with ID: ${notesId} not found`);
        //     return res.status(404).json({ message: `Notes document with ID: ${notesId} not found` });
        // }

        console.log(`Notes document with ID: ${notesId} deleted successfully`);
        res.status(200).json({ status: true, message: 'Notes document deleted successfully', data: deletedNotes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Notes document', error: error.message });
    }
});

// * Delete all Notes documents
router.delete('/delete-all-notes', async (req, res) => {
    try {
        const result = await Notes.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(404).send({ status: false, message: "No Notes documents found to delete!" });
        }

        res.status(200).send({ status: true, message: "All Notes documents have been deleted!", data: result });
        console.log(new Date().toLocaleString() + ' ' + 'DELETE All Notes documents Successfully!');

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;