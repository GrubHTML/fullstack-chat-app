import { ChatMessageModel } from "../models/index.js";

export const chatMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const messagesData = await ChatMessageModel.create({
      content: message,
      userId: req.user.id,
    });
    return res.status(201).json(messagesData);
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};
