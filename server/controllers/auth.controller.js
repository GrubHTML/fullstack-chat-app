import { ProfileModel, UserModel } from "../models/index.js";
// import { comparePassword } from "../utils/password.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    Profile = {},
  } = req.body;
  const { bio, address, avatar = null } = Profile;
  if (!bio || !address) {
    return res.status(400).json({ message: "Bio & address required" });
  }
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
      .status(201)
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
    const { password: _, ...safeuser } = userData.toJSON();
    if (!result)
      return res.status(401).json({ message: "invalid credentials" });
    const accessToken = generateAccessToken({ id: userData.id });

    // after accesstoken then generate the refresh token => save to cookies and database
    // generate refreshToken
    const refreshToken = jwt.sign(
      { id: userData.id },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    userData.refreshToken = refreshToken;
    await userData.save();
    // send to httponly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // return all data
    return res.status(200).json({
      message: "Login Successful!",
      user: safeuser,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// refresh token logic
export const refresh = async (req, res) => {
  const refresTokenFromCookies = req.cookies?.refreshToken;
  // console.log(refresTokenFromCookies);
  try {
    if (!refresTokenFromCookies)
      return res.status(401).json({ message: "no refresh token" });
    const decoded = jwt.verify(
      refresTokenFromCookies,
      process.env.JWT_REFRESH_TOKEN
    );
    const user = await UserModel.findOne({
      where: { id: decoded.id },
      attributes: ["id", "username", "email", "refreshToken"],
    });
    if (!user) return res.status(401).json({ message: "user not found" });
    if (refresTokenFromCookies !== user.refreshToken)
      return res
        .status(401)
        .json({ message: "refresh token mismatch from db" });
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: "15m",
    });
    return res
      .status(200)
      .json({ message: "new token generated", token: accessToken, user });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
