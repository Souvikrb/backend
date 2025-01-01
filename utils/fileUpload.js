const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder where files will be stored
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname); // Generate a unique file name
        cb(null, fileName);
    },
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files are allowed'), false); // Reject non-image files
    }
};

// Initialize multer with common configuration
const upload = multer({ storage, fileFilter });

module.exports = { upload, storage, fileFilter };
