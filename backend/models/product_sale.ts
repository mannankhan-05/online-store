import { Model, DataTypes } from "sequelize";
import product from "./product";
import db from "../config/database";

class product_sale extends Model {}

product_sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_sales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "product_sale",
    timestamps: true,
  }
);

product_sale.belongsTo(product, { foreignKey: "product_id" });

export default product_sale;
