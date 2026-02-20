import http from "http";
import { Server } from "socket.io";
import app from "./app";
import prisma from "./prisma/client";


const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", (msg, room) => {
    io.to(room).emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;
    
server.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server running on ${PORT}`);
});