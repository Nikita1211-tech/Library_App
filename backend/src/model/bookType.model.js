const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");
// const Book = require("./bookModel");

const Booktype = sequelize.define('Booktype',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
Booktype.sync({ force: false }).then(() => {
    console.log('Bookcategory table synced');
});

module.exports = Booktype ;