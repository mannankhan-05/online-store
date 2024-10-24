import { DataTypes, Model } from "sequelize";
import order from "./order";
import product from "./product";
import db from "../config/database";

class order_item extends Model {}

order_item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "order_item",
    timestamps: true,
  }
);

order_item.belongsTo(order, { foreignKey: "order_id" });
order_item.belongsTo(product, { foreignKey: "product_id" });

export default order_item;
