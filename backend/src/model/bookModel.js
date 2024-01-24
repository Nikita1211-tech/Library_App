const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");


const Book = sequelize.define('Book',{
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    BookName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    WriterName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
Book.sync({ force: false }).then(() => {
    console.log('Book table synced');
});
  
module.exports = Book;