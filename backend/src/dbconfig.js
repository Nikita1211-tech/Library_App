const { Sequelize, DataTypes } = require('sequelize');
require('./model/userModel');
require('dotenv').config();
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
  // Test the database connection
sequelize.authenticate()
    .then(() => {
      console.log('Connection to the database has been established successfully.');
})
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
});

module.exports =  {sequelize};