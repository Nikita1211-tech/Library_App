// import { DataTypes, INTEGER, Sequelize, } from "sequelize";
// import { sequelize } from "../dbconfig";
// interface IUser{
//     id: number
// }

import { DataTypes, INTEGER, Model, Optional } from "sequelize";
import { sequelize } from "../dbconfig";
export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: number;
  contact: number;
  role?: string;
  otp?: number;
}
interface userAttributes extends Optional<IUser, "id"> {}

interface userInstance extends Model<IUser, userAttributes>, IUser {
  createdAt?: Date;
  updatedAt?: Date;
}
const Users = sequelize.define<userInstance>("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "User",
  },
  otp: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
// const options = {
//   field: 'password',
//   rounds: 12,
//   compare: 'authenticate',
// }
// useBcrypt(Users, options);
Users.sync({ force: false }).then(() => {
  console.log("User table synced");
});

export { Users };
