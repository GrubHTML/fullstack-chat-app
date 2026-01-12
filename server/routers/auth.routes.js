import express from "express";
import { userSignIn, userSignUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userValidationSchema } from "../validations/schema.validation.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
const userRouter = express.Router();

userRouter.post(
  "/signup",
  // authLimiter,
  // validate(userValidationSchema.signup),
  userSignUp
);
userRouter.post(
  "/signin",
  // authLimiter,
  // validate(userValidationSchema.signin),
  userSignIn
);
export default userRouter;
