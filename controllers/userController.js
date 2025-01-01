const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Service = require('../models/serviceProvider');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id }  = req.params;
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required.' });
    }
    let user;
    if (id === 'admin') 
      user = await User.findOne({ email });
     else 
      user = await Service.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Your credentials are invalid.' });
    }
   
    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Your credentials are invalid.' });
    }

    if (user.status && user.status == 'inactive') {
      return res.status(400).json({ message: 'Your account is deactive.' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send token in response
    res.status(200).json({ token, message: 'Your are successfully logged in.' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
