import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbconfig";
interface bookcategory {
  id: number;
  category: string;
  image: string;
}
interface bookcategoryAttributes extends Optional<bookcategory, "id"> {}

interface bookcategoryInstance
  extends Model<bookcategory, bookcategoryAttributes>,
    bookcategory {
  createdAt?: Date;
  updatedAt?: Date;
}
const Bookcategory = sequelize.define<bookcategoryInstance>("Bookcategory", {
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
    unique: false,
  },
});
Bookcategory.sync({ force: false }).then(() => {
  console.log("Bookcategory table synced");
});

export { Bookcategory };
