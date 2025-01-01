const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Validate the phone number has a minimum and maximum number of digits
                return /^[0-9]{10,15}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid phone number! It should contain 10 to 15 digits.`
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    about: {
        type: String,
        trim: true,
        maxlength: 500, // You can set a maximum length for the "about" field
        default: "" // Default empty string if not provided
    },
    country: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        maxlength: 100, // Maximum length for country
        default: "" // Default empty string if not provided
    },
    city: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        maxlength: 100, // Maximum length for country
        default: "" // Default empty string if not provided
    },
    location: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        maxlength: 100, // Maximum length for country
        default: "" // Default empty string if not provided
    },
    category: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        maxlength: 100, // Maximum length for country
        default: "" // Default empty string if not provided
    },
    address: {
        type: String,
        trim: true,
        maxlength: 255, // Maximum length for address
        default: "" // Default empty string if not provided
    },
    profileImage: {
        type: String,
        default: "" // Default empty string if not provided (can store URL or base64 data)
    },
    status: {
        type: String,
        trim: true,
        maxlength: 100, // Maximum length for address
        default: "inactive" // Default empty string if not provided
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
