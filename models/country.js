const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true, // Removes extra whitespace
        minlength: 2, // Minimum length for country names
        maxlength: 100, // Maximum length for country names
        validate: {
            validator: function (v) {
                // Regular expression to allow only alphabetic characters and spaces
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid country name! Only alphabetic characters and spaces are allowed.`
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Country", countrySchema);
