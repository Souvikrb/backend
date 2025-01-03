const router = require('express').Router()
const multer = require("multer");
const upload = multer();
const {AdvertisementAdd,Advertisement} = require("../controllers/advertisementController")

router.get("/advertisement/:id?",Advertisement);
router.post("/advertisement",AdvertisementAdd);

module.exports = router;