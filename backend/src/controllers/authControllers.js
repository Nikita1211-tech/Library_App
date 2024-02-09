const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const Users = require('../model/userModel');
const Book = require('../model/bookModel');
const tokengenerator = require('../services/tokengenerator.service');
const otpgenerator = require('../services/otpgenerator.service');
// const Conn = require('../dbconfig');
require('dotenv')
const Login = (req,res) => {
   console.log("Hello");
}
const Logout = (req,res) => {
  res.clearCookie('jwt', { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Logout successful' });
}
const Register =  async(req,res) => {
    const user  = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      profilepic: req.body.profilepic,
      email: req.body.email,
      password: req.body.password,
    }
     try{
        const existinguser = await Users.findOne({ where: { email: user.email} })
        if(existinguser != null){
          return res.status(409).json({message: "User already exists"});
        }
         const newuser = await Users.create(user);
         return res.status(201).json({message: "User created successfully"})
    } catch(error){
      return res.status(500).json({message: error.message})
    }
}
const Auth = async (req,res) => {
    const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if(!user) return res.status(401).json({message: "Email id doesnot exists"});
    if(user.password === password){
         const token = tokengenerator(Users.email);
         res.cookie('jwt', token, { httpOnly: true, secure:true });
         return res.json({ token });
    }
    else return res.status(401).json({message: "Incorrect Password"});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Reset = async (req,res) => {
   const { email } = req.body;
   try{
    const user = await Users.findOne({where: { email }});
    if(user){
        const otp = otpgenerator();
        return res.json({otp});
    } 
    else return res.status(401).json({message: "Email id doesnot exists"});
   } catch(error){
     res.status(500).json({ message: error.message });
   }
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

module.exports = {Login, Auth, Logout, Register, Reset, Detail, bookList, bookDesc}
