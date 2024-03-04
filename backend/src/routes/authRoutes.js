const express = require('express');
const { Login, Auth, Logout, Register, Reset, Otp, updatePassword, Verifyuser, Verifyotp, Saveuser, Resendotp, Saveadmin } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const otpgenerator = require('../services/otpgenerator.service');
const { Booklist, Bookdesc, AddBook, upload, Updatebook, Deletebook, Bookcategory, Addbookcategory, Showbookcategory, Addbooktype, Showbooktype, Bookcategorylist, Books, Booktypes } = require('../controllers/adminControllers');
// const validationMiddleware = require('../middlewares/validations/registervalidation');
const Registervalidation = require('../middlewares/validations/registervalidation');
const saveUserHandler = require('../services/registervalidation');
const Passwordvalidation = require('../services/passwordvalidation');
// const Registerschema = require('../middlewares/schema/registerschema');

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
router.post('/resendotp', Resendotp);
router.post('/resetpassword', Reset);
router.post('/otp', Otp);
router.post('/saveuser', Saveuser);
router.post('/saveadmin', Saveadmin);
router.post('/addbook',upload.single('bookimg'), AddBook)
router.post('/updatepassword',Passwordvalidation , updatePassword);
router.get('/logout', Logout);
// Dashboard routes 
router.get('/books', Books);
router.get('/bookdescription/:book_id', Bookdesc);
router.post('/updatebook/:book_id', Updatebook);
router.post('/bookcategory', Bookcategory)
router.post('/booktype', Booktypes)
router.post('/addbookcategory', upload.single('image'), Addbookcategory)
router.post('/addbooktype', upload.single('image'), Addbooktype)
router.get('/showbookcategory', Showbookcategory)
router.get('/showbooktype', Showbooktype)
router.delete('/deletebook/:book_id', Deletebook);
router.get('/bookcategory', Bookcategory);
router.get('/booklist', Booklist);


module.exports = router;