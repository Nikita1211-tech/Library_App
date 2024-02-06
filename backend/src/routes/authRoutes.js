const express = require('express');
const { Login, Auth, Logout, bookList, bookDesc, bookCategory, Register } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();
// Login routes 
router.post('/login', Auth);
router.get('/main', authenticateJWT, (req,res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
})
// Register routes 
router.post('/register',Register)
router.get('/logout', Logout);
// Dashboard routes 
router.get('/books', bookList);
router.get('/bookdescription/:book_id', bookDesc);
router.get('/bookcategory', bookList);


module.exports = router;