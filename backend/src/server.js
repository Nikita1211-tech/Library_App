const express= require("express");
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/authRoutes");
require("./model/userModel");
require("./model/bookModel");
const protectedrouter = require("./routes/protected");

require("./dbconfig");
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes);
// app.use(Conn);
// Test server connection 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

