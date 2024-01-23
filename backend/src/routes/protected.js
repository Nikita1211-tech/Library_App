const express = require("express");
const authenticateJWT = require("../middlewares/auth");

const protectedrouter = express.Router();

protectedrouter.get('/login', authenticateJWT, (req,res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
})

module.exports = protectedrouter;