const express= require("express");
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/authRoutes");
require("./model/userModel");
require("./model/bookModel");

require("./dbconfig");
require('dotenv').config();
app.use(express.json());
const corsOptions = {
  origin: 'https://library-frontend-xiss.onrender.com',
};

app.use(cors(corsOptions));
app.use("/api/users", authRoutes);
// Test server connection 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

