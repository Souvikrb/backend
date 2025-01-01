const { upload } = require('../utils/fileUpload');
const Event = require('../models/event');

exports.addEvent = async (req, res) => {
    try {
        upload.single('profileImage')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const { eventName, eventHighlight, dateTime, country, city, location, category, status } = req.body;

            // Validate required fields
            if (!eventName || !eventHighlight || !dateTime) {
                return res.status(400).json({ message: 'Event name, highlight, and date/time are required.' });
            }

            const eventDate = new Date(dateTime);
            if (eventDate < new Date()) {
                return res.status(400).json({ message: 'Date cannot be in the past.' });
            }

            const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

            const newEvent = new Event({
                eventName,
                eventHighlight,
                dateTime: eventDate,
                country,
                city,
                location,
                profileImage,
                category,
                status: status || 'active',
            });

            await newEvent.save();

            res.status(201).json({ message: 'Event added successfully', data: newEvent });
        });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event', error: error.message });
    }
};

// Get a list of all event
exports.getEvent = async (req, res) => {
    const { id } = req.params;
    try {
        let events;
        if (id)
            events = await Event.findOne({ _id: id });
        else
            events = await Event.find({});

        res.status(200).json({ message: events });
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Update an existing Event by ID
exports.updateEvent = async (req, res) => {
    upload.single("profileImage")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading file", error: err.message });
        }

        try {
            const { id } = req.params;
            
            const { eventName, eventHighlight, dateTime, country, city, location, category, status } = req.body;
            // Validate required fields
            if (!eventName || !eventHighlight || !dateTime) {
                return res.status(400).json({ message: 'Event name, highlight, and date/time are required.' });
            }
            
            const eventDate = new Date(dateTime);
            // if (eventDate < new Date()) {
            //     return res.status(400).json({ message: 'Date cannot be in the past.' });
            // }
            // Prepare update object
            const updateData = {
                eventName,
                eventHighlight,
                dateTime: eventDate,
                country,
                city,
                location,
                category,
                status: status || 'active',
            };
            // If a file is uploaded, add its path to the update data
            if (req.file) {
                updateData.profileImage = `/uploads/${req.file.filename}` // Save the file path
            }
            
            // Find the Event by ID and update it
            const updatedEvents = await Event.findByIdAndUpdate(
                id,
                updateData,
                { new: true } // Return the updated document
            );

            if (!updatedEvents) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.status(200).json({
                message: "Event updated successfully",
                data: updatedEvents,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating Event",
                error: error.message,
            });
        }
    });
}

exports.deleteEvent = async (req, res) => {
        try {
            const { id } = req.params;

            // Find the Event by ID and delete it
            const deleteevent = await Event.findByIdAndDelete(id);

            if (!deleteevent) {
                return res.status(404).json({ message: 'Event not found' });
            }

            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error('Error deleting Event:', error);
            res.status(500).json({ message: 'Error deleting Event', error: error.message });
        }
    };