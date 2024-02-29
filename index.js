var app = require("express")();
var http = require("http").Server(app);
const path = require("path");
var io = require("socket.io")(http);

const port = 8000;

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "index.html";
  res.sendFile(fileName, options);
});

/***************Rooms***************** */
let roomno = 1;
let full = 0;

io.on("connection", (socket) => {
  socket.join(`Room-1${roomno}`);
  io.sockets
    .in(`Room-1${roomno}`)
    .emit("welcome", `You are conneted to Room no ${roomno}`);
  full++;
  if (full >= 2) {
    full = 0;
    roomno++;
  }
});

// let users=0
// var newIo=io.of('/custom');
// newIo.on("connection",(socket)=>{
//     console.log("User Connected");
// users++;

/**************io.sockets.emit is used to send message to all
    // io.sockets.emit("numberOfUsers",`Number of users connected are ${users}`);

    /****************socket is used to send new user only*************/
// socket.emit("welcome","Welcome to chat");

//This is for that users who are already connected
// socket.broadcast.emit("numberOfUsers",`Number of users connected are ${users}`);
// socket.emit("myMessage","Welcome to Server");
// socket.on("clientMessage",(data)=>{
//     console.log(data);
// });
/*************Showing how many users connected t0 all ************* */

// socket.on("disconnect",()=>{
//     console.log("User Disconnecte");
//     users--;
//     socket.broadcast.emit("numberOfUsers",`Number of users connected are ${users}`);
// });

// });

http.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
