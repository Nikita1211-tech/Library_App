const express= require("express");
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/authRoutes");
require("./model/userModel");
require("./model/bookModel");

require('dotenv').config();
// const corsOptions = {
  //   origin: [
    //     'https://library-frontend-xiss.onrender.com',
    //     'https://library-frontend-xiss.onrender.com/',
    //     'http://library-frontend-xiss.onrender.com',
    //     '*'
    //   ],
    // };
    
    app.use(cors( {
      origin: [
        'https://library-frontend-xiss.onrender.com',
        'https://library-frontend-xiss.onrender.com/',
        'http://library-frontend-xiss.onrender.com',
        'http://localhost:4200',
        '*',
      ],
    }));
    
require("./dbconfig");
app.use(express.json());
app.use("/api/users", authRoutes);
// Test server connection 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

