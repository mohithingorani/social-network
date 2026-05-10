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

  // Forward message payload to everyone in the room.
  // Clients may send: (message, roomName, id, time, userName)
  socket.on("message", (message, roomName, id, time, userName) => {
    io.to(roomName).emit("message", message, id, time, userName);
  });
});

const PORT = process.env.PORT || 3000;
    
server.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server running on ${PORT}`);
});
