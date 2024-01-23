const express= require("express");
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes)
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'Library'
});

// Define a User model
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
// Test server connection 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

