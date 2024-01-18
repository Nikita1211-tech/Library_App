var express = require("express");
const {Login, Register, Detail, Auth} = require("../controllers/authControllers");
var router = express.Router();

router.get("/login", Login);
router.post("/login", Auth);
router.get("/register", Register);
router.post("/register", Detail);
 
module.exports = router;