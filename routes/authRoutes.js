const express = require('express');
const { register, login } = require('../controllers/userController');
const { sendEmailOtp,verifyEmailOtp } = require("../controllers/emailVerificationController")
const multer = require("multer");
const upload = multer();
const router = express.Router();

// Route for user registration
/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

// Route for user login
/**
 * @route   POST /api/users/login
 * @desc    Login a user and return a token
 * @access  Public
 */
router.post('/login/:id?',upload.none(), login);

router.post('/sendEmailOTP',upload.none(), sendEmailOtp);
router.post('/verifyEmailOTP',upload.none(), verifyEmailOtp);
// Export the router
module.exports = router;
