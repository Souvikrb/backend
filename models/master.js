const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
    parent_id: {
        type: mongoose.Schema.Types.ObjectId, // Holds reference to other table/document
        refPath: 'parent_ref', // Dynamic reference to another model
        default: null // Allows null if no parent reference is provided
    },
    parent_ref: {
        type: String, 
        required: false
    },
    master_code: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    DESC1: { type: mongoose.Schema.Types.Mixed }, // Can hold any type of data
    DESC2: { type: mongoose.Schema.Types.Mixed },
    DESC3: { type: mongoose.Schema.Types.Mixed },
    DESC4: { type: mongoose.Schema.Types.Mixed },
    DESC5: { type: mongoose.Schema.Types.Mixed },
    DESC6: { type: mongoose.Schema.Types.Mixed },
    DESC7: { type: mongoose.Schema.Types.Mixed },
    DESC8: { type: mongoose.Schema.Types.Mixed },
    DESC9: { type: mongoose.Schema.Types.Mixed },
    DESC10: { type: mongoose.Schema.Types.Mixed },
    order: {
        type: Number, // Numeric value for ordering
        required: true,
        default: 0
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

module.exports = mongoose.model("Master", masterSchema);
