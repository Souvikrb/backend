const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true, // Removes extra whitespace
        minlength: 2, // Minimum length for city names
        maxlength: 100, // Maximum length for city names
        validate: {
            validator: function (v) {
                // Regular expression to allow only alphabetic characters and spaces
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid city name! Only alphabetic characters and spaces are allowed.`
        }
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Country" // Reference to the Country model
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("City", citySchema);
