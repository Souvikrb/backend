const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventHighlight: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensure date is not in the past
            },
            message: 'Date cannot be in the past.',
        },
    },
    country: {
        type: mongoose.Schema.Types.Mixed,
        default: '',
    },
    city: {
        type: mongoose.Schema.Types.Mixed,
        default: '',
    },
    location: {
        type: mongoose.Schema.Types.Mixed,
        default: '',
    },
    profileImage: {
        type: String,
        default: '',
    },
    category: {
        type: mongoose.Schema.Types.Mixed,
        default: '',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
});

module.exports = mongoose.model('Event', eventSchema);
