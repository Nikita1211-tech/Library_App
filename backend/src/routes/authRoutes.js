const express = require('express');
const { Login, Auth } = require('../controllers/authControllers');
const router = express.Router();
router.get('/login',Login);
router.post('/login', Auth);
module.exports = router;