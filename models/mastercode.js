const mongoose = require("mongoose");

const masterCodeSchema = new mongoose.Schema({
    master_code: {
        type: String,
        required: true,
        unique: true, // Ensures the master_code is unique
        trim: true, // Removes extra whitespace
        minlength: 1 // Minimum length validation
    },
    title: {
        type: String,
        required: true,
        trim: true, // Removes extra whitespace
        minlength: 1,
        maxlength: 255 // Maximum length for the title
    },
    description: {
        type: String,
        required: false, // Optional field
        trim: true, // Removes extra whitespace
        maxlength: 1000 // Maximum length for the description
    },
    status: {
        type: Number,
        enum: [0, 1], // Restricts to predefined values
        default: 1 // Default status
    },
    action: {
        type: mongoose.Schema.Types.Mixed, // Allows storing any type (string, number, object, etc.)
        required: false // Optional field
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("MasterCode", masterCodeSchema);
