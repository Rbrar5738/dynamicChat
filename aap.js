const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const PORT = 3000;
let users = 0;
app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "home.html";
  res.sendFile(fileName, options);
});
io.on("connection", (socket) => {
  console.log("User Connected");
  users++;

  socket.emit("welcome", "Welcome to chat");
  socket.broadcast.emit("msg", `Number os users ${users}`);
  socket.on("event", (data) => {
    console.log(data);
    io.emit("response form server 3000", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    users--;
    socket.broadcast.emit("dis", `Number os users ${users}`);
  });
});

http.listen(PORT, () => {
  console.log("Server Started");
});
