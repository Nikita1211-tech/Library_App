const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');
const Book = require('../model/bookModel');
// const Conn = require('../dbconfig');
require('dotenv')
const Login = (req,res) => {
   console.log("Hello");
}
const Auth = async (req,res) => {
    const { email, password } = req.body;

  try {
    // Finds the user in the database
    const user = await User.findOne({ where: { email } });

    if (user && user.password === password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      console.log(token);
      res.cookie('jwt', token, { httpOnly: true, secure:true });
      return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Logout = (req,res) => {
  res.clearCookie('jwt', { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Logout successful' });
}
const Register = (req,res) => {
    console.log("Register Success");
}

const Detail = (req,res) => {
    var username = req.body.username;
    var password  = req.body.password;
    console.log(`Username: ${username}, Password: ${password}`)
}
const bookList = async(req,res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const bookDesc = async(req,res) => {
  const bookId = req.params.book_id;
  try {
    const book = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {Login, Auth, Logout, Register, Detail, bookList, bookDesc}
