const express = require('express');
const router = express.Router();
const {
  addServiceProvider,
  getServiceProviders,
  updateServiceProvider,
  deleteServiceProvider
} = require('../controllers/serviceProviderController');
const validateToken = require('../middleware/authMiddleware');

//router.use(validateToken);
// Route to add a new service provider
router.post('/serviceprovider', addServiceProvider);

// Route to get a list of all service providers
router.get('/serviceprovider/:id?', getServiceProviders);

// Route to update an existing service provider
router.put('/serviceprovider/:id', updateServiceProvider);

// Route to delete a service provider by ID
router.delete('/serviceprovider/:id', deleteServiceProvider);

module.exports = router;
