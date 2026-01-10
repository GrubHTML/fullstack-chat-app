import express from "express";
import { createUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userValidationSchema } from "../validations/schema.validation.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
const userRouter = express.Router();

userRouter.post(
  "/signup",
  authLimiter,
  validate(userValidationSchema.signup),
  createUser
);

export default userRouter;
