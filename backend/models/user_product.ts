import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import user from "./user";
import product from "./product";

class user_product extends Model {}

user_product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "user_product",
    timestamps: true,
  }
);

user_product.belongsTo(user, { foreignKey: "user_id" });
user_product.belongsTo(product, { foreignKey: "product_id" });

export default user_product;
