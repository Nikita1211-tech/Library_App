const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
const multer = require('multer');
const authRoutes = require("./routes/authRoutes");
const { AddBook } = require("./controllers/adminControllers");
require("./model/userModel");
require("./model/bookModel");

require('dotenv').config();

const app = express();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Middleware setup
app.use(cors({
  origin: [
    'https://library-frontend-xiss.onrender.com',
    'https://library-frontend-xiss.onrender.com/',
    'http://library-frontend-xiss.onrender.com',
    'http://localhost:4200',
    '*',
  ],
}));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Routes setup
app.use("/api/users", authRoutes);


// Test server connection 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
