import ProfileModel from "../models/profile.model.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    Profile: { avatar, bio, address },
  } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = await UserModel.create(
      {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        Profile: {
          avatar,
          bio,
          address,
        },
      },
      { include: [{ model: ProfileModel }] }
    );
    const { password: _password, ...safeuser } = userData.toJSON();
    if (!userData) return res.status(401).json("failed to create user");
    return res
      .status(200)
      .json({ message: "User created successfully!", safeuser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
