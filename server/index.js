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

 // receive data from client
  socket.on("MyClientEvent", function (data) {
    console.log(data);
  });

  socket.on("disconnect", function () {
    console.log("User Disconnected!");
  });
});

//send broadcasting data
io.on("connection", function (socket) {
  io.sockets.emit("MyBroadCast", "Hello Everyone");
  console.log("New User Connected");
}),

// namespace
let buyNsp = io.of("/buy");
buyNsp.on("connection", function (socket) {
  buyNsp.emit("MyBroadCast", "Hello Buy World");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", function (socket) {
  sellNsp.emit("MyBroadCast", "Hello Sell World");
});

// room
io.on("connection", function (socket) {
  // kitchen room 
  socket.join("kitchen-room");
  let sizeOfKitchen = io.sockets.adapter.rooms.get('kitchen-room').size;
  io.sockets.in("kitchen-room").emit("cooking", "Fried Rice Cooking = " + sizeOfKitchen);

  // bed room 
  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I will sleep");
  io.sockets.in("bed-room").emit("rest", "I am taking rest");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

expressServer.listen(port, function () {
  console.log(`Server listening on ${port}`);
});
