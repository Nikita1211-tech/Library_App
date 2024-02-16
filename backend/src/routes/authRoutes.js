const express = require('express');
const { Login, Auth, Logout, Register, Reset, Otp, updatePassword, Verifyuser, Verifyotp, Saveuser } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const otpgenerator = require('../services/otpgenerator.service');
const { Booklist, Bookdesc, Addbook } = require('../controllers/adminControllers');
const router = express.Router();
// Login routes 
router.post('/login', Auth);
// router.get('/main', authenticateJWT, (req,res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// })
// Auth routes 
// router.post('/register',Register);
router.post('/verifyuser', Verifyuser);
router.post('/verifyotp', Verifyotp);
router.post('/resetpassword', Reset);
router.post('/otp', Otp);
router.post('/saveuser', Saveuser);
router.post('/addbook', Addbook)
router.post('/updatepassword', updatePassword);
router.get('/logout', Logout);
// Dashboard routes 
router.get('/books', Booklist);
router.get('/bookdescription/:book_id', Bookdesc);
router.get('/bookcategory', Booklist);


module.exports = router;