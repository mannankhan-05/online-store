import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import user from "./user";

class user_address extends Model {}

user_address.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "user_address",
    timestamps: true,
  }
);

user_address.belongsTo(user, { foreignKey: "user_id" });

export default user_address;
