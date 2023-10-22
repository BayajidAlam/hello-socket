const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const expressServer = http.createServer(app);
const port = 5000;

const { Server } = require("socket.io");
let io = new Server(expressServer);

io.on("connection", function (socket) {
  socket.on("chat", function (msg) {
    io.emit("chatReply", msg);
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

expressServer.listen(port, () => {
  console.log(`Chatting app listening on port ${port}`);
});
