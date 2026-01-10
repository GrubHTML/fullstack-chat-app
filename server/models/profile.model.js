import { DataTypes } from "sequelize";
import sequelize from "../configs/dbConfig.js";

const ProfileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    // defaultValue: "default-avatar.png",
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default ProfileModel;
