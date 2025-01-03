const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventHighlight: {
        type: String
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
    eventDescription: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    providerName: {
        type: String,
        required: true,
    },
    dateTime: [
        {
          date: { type: String, required: true }, // Date in YYYY-MM-DD format
          timeSlots: [
            {
              stime: { type: String, required: true }, // Start time
              etime: { type: String, required: true }, // End time
              guests: { type: Number, required: true }, // Number of guests
            },
          ],
        },
      ],
    termsTitle:{
        type:String
    },
    termsDetails:{
        type:String
    }
});

module.exports = mongoose.model('Event', eventSchema);
