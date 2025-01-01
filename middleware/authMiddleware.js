const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);
  // Check if the token is present in the Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract the token
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the decoded user data to the request object
      req.user = decoded; 

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({
        message: "User is not authorized",
        error: error.message || error
      });
    }
  } else {
    // If the token is missing
    return res.status(401).json({
      message: "Authorization token is missing"
    });
  }
};

module.exports = validateToken;
