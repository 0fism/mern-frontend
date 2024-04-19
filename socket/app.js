import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://mern-client-inky.vercel.app",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};


io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser)
  });
  // sendMessage event?
  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log("app.js"+data);
    const receiver = getUser(receiverId)
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");
