const mysql = require('mysql2');
const Conn = require('../dbconfig');
// const Login = (req,res) => {
//     console.log("Login Success");
// }
// const Auth = (req,res) => {
//     username = req.body.username;
//     password = req.body.password;
//     if(username && password){Conn.query("SELECT * from login WHERE userName = ? AND Password = ?",[username, password], function(error, results){
//         if (error) throw error
//         if(results.length>0){
//             // request.session.username = userName;
//             console.log("Login successful");
//         }
//         else{
//             console.log("Incorrect Password");
//         }
//     });
// }
//  else{
//         console.log("User doesnot exists");
//      }
// }
// const Register = (req,res) => {
//     console.log("Register Success");
// }

// const Detail = (req,res) => {
//     var username = req.body.username;
//     var password  = req.body.password;
//     console.log(`Username: ${username}, Password: ${password}`)
// }
const AuthService = require('../../services/auth.services');
const jwtConfig = require('../../jwtconfig');
const bcryptUtil = require('../../utils/bcrypt.util');
const jwtUtil = require('../../utils/jwt.utils');

exports.register = async (req, res) => { 
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if(isExist) {
        return res.status(400).json({ 
            message: 'Email already exists.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => { 
    const user = await AuthService.findUserByEmail(req.body.email); 
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Logged out successfully.' });
}