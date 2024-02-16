const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");


const Book = sequelize.define('Book',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    writerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sellingprice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    costprice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishyear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    booksummary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookcat_img: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    booktype_img: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    booktypename: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
Book.sync({ force: false }).then(() => {
    console.log('Book table synced');
});
  
module.exports = Book;