const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');
// const Conn = require('../dbconfig');
require('dotenv')
const Login = (req,res) => {

}
const Auth = async (req,res) => {
    const { email, password } = req.body;

  try {
    // Finds the user in the database
    const user = await User.findOne({ where: { email } });

    if (user && user.password === password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Register = (req,res) => {
    console.log("Register Success");
}

const Detail = (req,res) => {
    var username = req.body.username;
    var password  = req.body.password;
    console.log(`Username: ${username}, Password: ${password}`)
}
module.exports = {Login, Auth, Register, Detail}
