import { DataTypes, Model } from "sequelize";
import product_category from "./product_category";
import db from "../config/database";

class product extends Model {}

product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "product",
    timestamps: true,
  }
);

// Define the relationship: a product belongs to a category
product.belongsTo(product_category, { foreignKey: "category_id" });
// A category can have many products
product_category.hasMany(product, { foreignKey: "category_id" });

export default product;
