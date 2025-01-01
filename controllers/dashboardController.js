// Controller for dashboard
exports.dashboard = async (req, res) => {
    try {
      // Send a successful response
      return res.status(200).json({ message: "Working", success: true });
    } catch (error) {
      // Handle errors and send a failure response
      console.error('Error in dashboard controller:', error); // Log the error for debugging
      return res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: error.message || error, // Send the error message if available
      });
    }
  };
  