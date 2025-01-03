const multer = require('multer');
const path = require('path');
const ServiceProvider = require('../models/serviceProvider');
const bcrypt = require('bcrypt');
// Add a new service provider
// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder where images will be stored
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const fileName = Date.now() + fileExtension; // Generate a unique file name
        cb(null, fileName); // Save the file with the generated name
    }
});

// Set up multer file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Allow the file
    } else {
        cb(new Error('Only image files are allowed'), false); // Reject non-image files
    }
};

// Initialize multer with storage and file filter configuration
const upload = multer({ storage, fileFilter });

exports.addServiceProvider = async (req, res) => {
    try {
        // Handle file upload (only one file is expected)
        upload.single('profileImage')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message }); // If file upload fails
            }

            // Extract data from the request body
            const { fullName, phone, email,password, about, country, city, location, category, status } = req.body;

            // Check if the required fields are provided
            if (!fullName || !email || !phone) {
                return res.status(400).json({ message: 'Full name, email, and phone are required' });
            }

            const isEmail = await ServiceProvider.findOne({ email });

            if (isEmail)
                return res.status(400).json({ message: 'Email Id is already exist.' });

            const isPhone = await ServiceProvider.findOne({ phone });

            if (isPhone)
                return res.status(400).json({ message: 'Phone Number is already exist.' });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Get the uploaded file's path (or URL if using a cloud storage service)
            const profileImage = req.file ? `/uploads/${req.file.filename}` : ""; // Use local path for simplicity

            // Create a new service provider document
            const newServiceProvider = new ServiceProvider({
                fullName,
                email,
                phone,
                password:hashedPassword,
                about: about || "", // Optional field with default empty string if not provided
                country: country || "", // Optional field with default empty string if not provided
                city: city || "", // Optional field with default empty string if not provided
                location: location || "",
                category: category || "",
                profileImage // Save the uploaded profile image path
            });

            // Save the service provider to the database
            await newServiceProvider.save();

            res.status(201).json({ message: 'Service provider added successfully', data: newServiceProvider });
        });
    } catch (error) {
        console.error('Error adding service provider:', error);
        res.status(500).json({ message: 'Error adding service provider', error: error.message });
    }
};

// Get a list of all service providers
exports.getServiceProviders = async (req, res) => {
    const { id } = req.params;
    try {
        let serviceProviders;
        if (id)
            serviceProviders = await ServiceProvider.findOne({ _id: id });
        else
            serviceProviders = await ServiceProvider.find({});

        res.status(200).json({ message: serviceProviders });
    } catch (error) {
        console.error('Error fetching service providers:', error);
        res.status(500).json({ message: 'Error fetching service providers', error: error.message });
    }
};

// Update an existing service provider by ID
exports.updateServiceProvider = async (req, res) => {
    upload.single("profileImage")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading file", error: err.message });
        }

        try {
            const { id } = req.params;
            const { fullName, phone, email, about, country, city, location, category,status } = req.body;
            // Check if the required fields are provided
            if (!fullName || !email || !phone) {
                return res.status(400).json({ message: 'Full name, email, and phone are required' });
            }

            // Prepare update object
            const updateData = {
                fullName,
                phone,
                email,
                about,
                country,
                city,
                location,
                category,
            };

            // If a file is uploaded, add its path to the update data
            if (req.file) {
                updateData.profileImage = req.file.path; // Save the file path
            }
            
            // Find the service provider by ID and update it
            const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
                id,
                updateData,
                { new: true } // Return the updated document
            );

            if (!updatedServiceProvider) {
                return res.status(404).json({ message: "Service provider not found" });
            }

            res.status(200).json({
                message: "Service provider updated successfully",
                data: updatedServiceProvider,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating service provider",
                error: error.message,
            });
        }
    });
}

    // Delete a service provider by ID
exports.deleteServiceProvider = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the service provider by ID and delete it
        const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(id);

        if (!deletedServiceProvider) {
            return res.status(404).json({ message: 'Service provider not found' });
        }

        res.status(200).json({ message: 'Service provider deleted successfully' });
    } catch (error) {
        console.error('Error deleting service provider:', error);
        res.status(500).json({ message: 'Error deleting service provider', error: error.message });
    }
};

exports.approveServiceProvider = async (req, res) => {
        try {
            const { id } = req.params;
            const { status  } = req.body;
            // Prepare update object
            const updateData = {
                status
            };
            // Find the service provider by ID and update it
            const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
                id,
                updateData,
                { new: true } // Return the updated document
            );

            if (!updatedServiceProvider) {
                return res.status(404).json({ message: "Service provider not found" });
            }

            res.status(200).json({
                message: "Change status successfully",
                data: updatedServiceProvider,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating service provider",
                error: error.message,
            });
        }
}
