const mongoose = require('mongoose');

// Connection function to MongoDB
const connection = async () => {
  try {
    // Connect to the database using the connection string from environment variables
    const dbUri = 'mongodb://127.0.0.1:27017/eventManagement';
    const connect = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected successfully to: ${connect.connection.host}`);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connection;
