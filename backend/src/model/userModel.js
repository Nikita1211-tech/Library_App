const { DataTypes, NUMBER, INTEGER } = require("sequelize");
const { sequelize } = require("../dbconfig");

const useBcrypt = require('sequelize-bcrypt');
const Users = sequelize.define('Users',{
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User",
    },
    otp: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
})
const options = {
  field: 'password',
  rounds: 12,
  compare: 'authenticate', 
}
useBcrypt(Users, options);
Users.sync({ force: false }).then(() => {
    console.log('User table synced');
});
  
module.exports = Users;