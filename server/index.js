const express = require("express");
const app = express();
const port = 5000;
const http = require("http");
const path = require("path");
const expressServer = http.createServer(app);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

expressServer.listen(port, function () {
  console.log(`Server listening on ${port}`);
});
