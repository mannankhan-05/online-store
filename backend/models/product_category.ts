import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import product from "./product";

class product_category extends Model {}

product_category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "product_category",
    timestamps: true,
  }
);

export default product_category;
