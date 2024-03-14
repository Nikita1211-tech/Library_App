// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../dbconfig");

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../dbconfig";
interface book {
  id: number;
  img: string;
  bookName: string;
  writerName: string;
  sellingprice: string;
  costprice: string;
  publishyear: number;
  booksummary: string;
  bookcat_img: string;
  category: string;
  booktype_img: string;
  booktypename: string;
}
interface bookAttributes extends Optional<book, "id"> {}

interface bookInstance extends Model<book, bookAttributes>, book {
  createdAt?: Date;
  updatedAt?: Date;
}
const Book = sequelize.define<bookInstance>("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
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
    unique: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  booktype_img: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  booktypename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Book.sync({ force: false }).then(() => {
  console.log("Book table synced");
});

export { Book };
