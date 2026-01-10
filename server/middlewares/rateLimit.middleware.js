import { rateLimit } from "express-rate-limit";
import { limiterMsgsForClient } from "../utils/ratelimitErrorHandler.js";
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  // ipv6Subnet: 56,
  handler: limiterMsgsForClient,
});
