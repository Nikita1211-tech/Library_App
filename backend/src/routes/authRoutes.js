const express = require('express');
const { Login, Auth } = require('../controllers/authControllers');
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();
router.post('/login', Auth);
// router.post('/login', authenticateJWT, (req,res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// })
router.get('/home', authenticateJWT, (req,res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
})
// router.post('/logout', Login);
module.exports = router;