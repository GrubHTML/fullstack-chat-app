import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import sequelize from "./configs/dbConfig.js";
import "./models/index.js";

// ENV Configuration
dotenv.config();
const PORT = process.env.port;

const app = express();

// CORS
const corsOptions = {
  origin: ["http://192.168.88.12:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
};
app.use(cors(corsOptions));
// JSON payloads
app.use(express.json());

// Routers
import userRouter from "./routers/auth.routes.js";
import ChatMessageRouter from "./routers/chatMessage.route.js";

//Middlewares
app.use("/api", userRouter);
app.use("/api", ChatMessageRouter);
// Socket - HTTP
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// Socket Connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("chat", (message) => {
    console.log("Chat message:", message);
    const { myRoom } = message;
    if (myRoom) {
      socket.join(myRoom);
      io.to(myRoom).emit("chat", message);
    } else {
      io.emit("chat", message);
    }
  });
});
// DB Connection
const dbConnection = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbConnection();
server.listen(PORT, "0.0.0.0", () => {
  console.log(`server running at http://192.168.88.12:${PORT}`);
});
