import { ProfileModel, UserModel } from "../models/index.js";
// import { comparePassword } from "../utils/password.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/token.js";

export const userSignUp = async (req, res) => {
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
    return res.status(500).json({ message: "internal server error" });
  }
};
export const userSignIn = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
  try {
    const userData = await UserModel.findOne({
      where: isEmail
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
      attributes: ["id", "email", "username", "password"],
    });
    if (!userData)
      return res.status(401).json({ message: "invalid credentials" });
    const result = await bcrypt.compare(password, userData.password);
    if (!result)
      return res.status(401).json({ message: "invalid credentials" });
    const accessToken = generateAccessToken({ id: userData.id });
    return res
      .status(200)
      .json({ message: "Login Successful!", userData, token: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
