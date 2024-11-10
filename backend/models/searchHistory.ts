import { DataTypes, Model } from "sequelize";
import db from "../config/database";

class searchHistory extends Model {}

searchHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    search: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "searchHistory",
    timestamps: true,
  }
);

export default searchHistory;
