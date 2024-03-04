const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");
// const Book = require("./bookModel");

const Bookcategory = sequelize.define('Bookcategory',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
})
Bookcategory.sync({ force: false }).then(() => {
    console.log('Bookcategory table synced');
});

module.exports = Bookcategory ;