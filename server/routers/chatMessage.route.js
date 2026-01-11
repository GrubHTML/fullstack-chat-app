import express from "express";
import { chatMessage } from "../controllers/chatMessage.controller.js";
import { checkLogin } from "../middlewares/authorization.middleware.js";
const ChatMessageRouter = express.Router();

ChatMessageRouter.post("/chat-message", checkLogin, chatMessage);
export default ChatMessageRouter;
