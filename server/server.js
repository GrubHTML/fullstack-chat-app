import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.port;

const app = express();
const corsOptions = {
  origin: ["http://192.168.88.12:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
};
app.use(cors(corsOptions));
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("chat", (message) => {
    console.log("Chat message:", message);
    io.emit("chat", message);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server running at http://192.168.88.12:${PORT}`);
});
