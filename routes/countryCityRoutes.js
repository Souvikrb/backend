const router = require("express").Router();
const {countryList,countryAdd} = require("../controllers/masterController");
router.get('/',countryList);
router.post('/add',countryAdd);
module.exports = router;