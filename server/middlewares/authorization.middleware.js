import jwt from "jsonwebtoken";
export const checkLogin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized user" });
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = {
      id: decoded.id,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};
