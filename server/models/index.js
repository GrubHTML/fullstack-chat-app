import ChatMessageModel from "./chatMessages.model.js";
import ProfileModel from "./profile.model.js";
import UserModel from "./user.model.js";

// UserModel <=> ProfileModel
UserModel.hasOne(ProfileModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ProfileModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// UserModel <=> ChatMessageModel
UserModel.hasOne(ChatMessageModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ChatMessageModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export { UserModel, ProfileModel, ChatMessageModel };
