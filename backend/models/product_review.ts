import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import product from "./product";
import user from "./user";

class product_review extends Model {}

product_review.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "product_review",
    timestamps: true,
  }
);

product_review.belongsTo(product, { foreignKey: "product_id" });
product_review.belongsTo(user, { foreignKey: "user_id" });

export default product_review;
