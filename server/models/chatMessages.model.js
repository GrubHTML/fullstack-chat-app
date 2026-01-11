import { DataTypes } from "sequelize";
import sequelize from "../configs/dbConfig.js";

const ChatMessageModel = sequelize.define("ChatMessage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default ChatMessageModel;
