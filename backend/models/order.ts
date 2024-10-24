import { DataTypes, Model } from "sequelize";
import user from "./user";
import db from "../config/database";

class order extends Model {}

order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    order_items: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "order",
    timestamps: true,
  }
);

order.belongsTo(user, { foreignKey: "user_id" });

export default order;
