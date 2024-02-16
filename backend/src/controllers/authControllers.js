const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Users = require('../model/userModel');
const Book = require('../model/bookModel');
const tokengenerator = require('../services/tokengenerator.service');
const otpgenerator = require('../services/otpgenerator.service');
const { where } = require('sequelize');
const otpSender = require('../services/nodemailer');
const users =[];
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
const Verifyuser = async(req,res) => {
   const { email } = req.body;
   const otp = otpgenerator()
   otpSender(email,otp)
   users.push({email, otp});
   res.status(200).json({message: "OTP received"});
  //  return res.json({email});
}
const Verifyotp = async(req,res) => {
  const{email, otp} = req.body;
  const user = users.find(user => user.email === email);
  if (user.otp == otp) {
    users.splice(users.indexOf(user), 1);
    res.status(200).json({ message: 'OTP verified successfully' });
    console.log(user);
  } else {
    // Remove the used OTP from the database
    res.status(400).json({ message: 'Invalid OTP' });
  }
}
const Saveuser = async(req,res) => {
  const user = {
    email:  req.body.email,
    username: req.body.username, 
    contact: req.body.contact, 
    password: req.body.password
    }
    const existinguser = await Users.findOne({ where: { email: user.email} })
    console.log(existinguser)
    if(existinguser == null){
      const newuser = await Users.create( {
        email:  req.body.email,
        username: req.body.username, 
        contact: req.body.contact, 
        password: req.body.password
        });
      console.log(newuser);
      return res.status(201).json({message: "User created successfully"})
    }
    else if(existinguser != null){
      res.status(400).json({message: "User already exists"})
    }
    else{
      res.status(500).json({message: "Internal Server error"})
    }

}
const Auth = async (req,res) => {
    const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });
    console.log(user)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword)
    if(user != null ) return res.status(401).json({message: "Email id doesnot exists"});
    if(validPassword){
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
        otpSender(email, otp);
        await Users.update({otp: otp}, {where: {
          email: email
        }});
        return res.json({email});
    } 
    else return res.status(401).json({message: "Email id doesnot exists"});
   } catch(error){
     res.status(500).json({ message: error.message });
   }
}
const Otp = async(req,res) => {
  const { email, otp } = req.body;
  try{
    const user =  await Users.findOne({where: {
      email: email
    }});
    console.log(email)
    if(otp != user.otp){
      res.status(401).json({message: "OTP not matched"});
    }
    else if(email != user.email){
      res.status(400).json({message: "Email ID doesnot exists"});
    }
    else{
      res.status(200).json({message: "OTP matched"});
    }
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}
const updatePassword = async(req,res) => {
    const { email, password } = req.body;
    try {
      const updatedpassword = await Users.update({password: password}, {where: {
        email: email
      }});
      if(updatedpassword){
        res.status(200).json("Password updated successfully")
      }
      else{
        res.status(400).json("Password not updated successfully")
      }
    } catch (error) {
      
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

module.exports = {Login, Auth, Logout, Register,Verifyuser, Verifyotp, Saveuser, Reset, updatePassword, Otp, Detail, bookList, bookDesc}
