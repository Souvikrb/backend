const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const validateToken = require("../middleware/authMiddleware");
const { dashboard } = require("../controllers/dashboardController");
const { 
    countryList, 
    countryAdd, 
    cityList, 
    cityAdd,
    masterList,
    masterAdd,
    masterDelete,
    masterSingledata
} = require("../controllers/masterController");

const {
    addMenu,
    getMenus,
    updateMenu,
    deleteMenu,
  } = require('../controllers/menuController');


router.use(validateToken);
// Dashboard route
/**
 * @route   GET /
 * @desc    Dashboard access (protected)
 * @access  Private
 */
router.get("/", dashboard);


// Route to add a new menu or submenu
router.post('/menu', addMenu);

// Route to get all menus (with submenus)
router.get('/menus', getMenus);

// Route to update a menu
router.put('/menu/:id', updateMenu);

// Route to delete a menu
router.delete('/menu/:id', deleteMenu);

router.post('/addlist/:id?',upload.none(),masterAdd);
router.get('/list/:mid?/:id?',masterList);
router.get('/listSingledata/:id?',masterSingledata);
router.delete('/deletelist/:id', masterDelete);

module.exports = router;
