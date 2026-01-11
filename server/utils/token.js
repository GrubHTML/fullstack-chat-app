import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRETKEY;

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
};
