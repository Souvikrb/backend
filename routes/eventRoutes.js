const express = require("express");
const router = express.Router();
const { addEvent,getEvent,updateEvent,deleteEvent } = require("../controllers/eventManager")

router.post('/event', addEvent);

// Route to get a list of all Event
router.get('/event/:id?', getEvent);

// // Route to update an existing Event
router.put('/event/:id', updateEvent);

// // Route to delete a Event by ID
router.delete('/event/:id', deleteEvent);
module.exports = router;