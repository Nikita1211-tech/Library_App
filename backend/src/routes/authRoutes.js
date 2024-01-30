const express = require('express');
const { Login, Auth, Logout, bookList, bookDesc } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();
router.post('/login', Auth);
router.get('/main', authenticateJWT, (req,res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
})
router.get('/logout', Logout);
router.get('/books', bookList);
router.get('/bookdescription/:book_id', bookDesc);

module.exports = router;