import ProfileModel from "./profile.model.js";
import UserModel from "./user.model.js";

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
