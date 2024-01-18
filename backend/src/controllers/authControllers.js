const mysql = require('mysql2');
const Conn = require('../dbconfig');
const Login = (req,res) => {
    console.log("Login Success");
}
const Auth = (req,res) => {
    username = req.body.username;
    password = req.body.password;
    if(username && password){Conn.query("SELECT * from login WHERE userName = ? AND Password = ?",[username, password], function(error, results){
        if (error) throw error
        if(results.length>0){
            // request.session.username = userName;
            console.log("Login successful");
        }
        else{
            console.log("Incorrect Password");
        }
    });
}
 else{
        console.log("User doesnot exists");
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
module.exports = { Login, Register, Detail, Auth};