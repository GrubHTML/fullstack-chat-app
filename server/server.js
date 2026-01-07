import express from "express";
import { createServer } from "node:http";
// using createServer for beter controlling of http
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
// Server class import korlam jno shob kaj korte pari

dotenv.config();
const PORT = process.env.port;

const app = express();
const server = createServer(app);
const io = new Server(server);
// amr http server diye ekti socket server banalam.

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
// jokhon e new user connect hobe, socket.io ekti connection event trigger korbe ebong console a dekhabe
// jokhon kono client browser a connect hoy tokhon io.on("connection", … ) ei function cholte thake
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    // console.log("message: ", msg);
    io.emit("chat message", msg);
    // socket.emit hole shudhu shei user peto msg ta
    // io.emit er mane holo server shob connected user+sender ke shei msg pathay
    // etay broadcast mesages
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
