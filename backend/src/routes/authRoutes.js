const express = require('express');
const {Login, Auth} = "./../controllers/authControllers"
const router = express.Router();
// // const AuthController = require('../controllers/authControllers');
// // const ErrorHandler = require('../middlewares/error.middleware');
// // const AuthGuard = require('../middlewares/auth.middleware');
// // const schema = require('../../validations/auth.validation');
// // const validate = require('../../utils/validator.util'); 

// router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
// router.post('/login', Auth);
// router.get('/login', Log);

// router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))
router.get('/login', () => {
    console.log("Hello")
});
// router.post('/login', Auth);
module.exports = router;