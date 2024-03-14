// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../dbconfig");
// const Book = require("./bookModel");

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbconfig";
interface booktype {
  id: number;
  type: string;
  image: string;
}
interface booktypeAttributes extends Optional<booktype, "id"> {}

interface booktypeInstance
  extends Model<booktype, booktypeAttributes>,
    booktype {
  createdAt?: Date;
  updatedAt?: Date;
}
const Booktype = sequelize.define<booktypeInstance>("Booktype", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});
Booktype.sync({ force: false }).then(() => {
  console.log("Bookcategory table synced");
});

export { Booktype };
