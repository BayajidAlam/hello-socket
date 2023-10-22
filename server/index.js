const express = require("express");
const app = express();
const port = 5000;
const http = require("http");
const path = require("path");
const expressServer = http.createServer(app);

// configure socket
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  console.log("New User Connected");

  // send data after a time
  setTimeout(() => {
    socket.send("Welcome To server Side to Client");
  }, 3000);

  // send data continuously
  setInterval(() => {
    let date = new Date();
    let time = date.getTime();
    socket.send(time);
  }, 10);

  // create a custom event
  setInterval(() => {
    let date = new Date();
    let time = date.getTime();
    socket.emit("myEvent", time);
  }, 10);

  socket.on("disconnect", function () {
    console.log("User Disconnected!");
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

expressServer.listen(port, function () {
  console.log(`Server listening on ${port}`);
});
