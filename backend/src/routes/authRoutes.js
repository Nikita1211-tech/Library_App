const express = require('express');
const { Login, Auth, Logout } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();
router.post('/login', Auth);
// router.post('/login', authenticateJWT, (req,res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// })
router.get('/main', authenticateJWT, (req,res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
})
router.get('/logout', Logout);
// router.post('/logout', Login);
module.exports = router;