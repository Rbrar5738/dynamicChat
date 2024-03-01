const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userModel = require("./models/userModel");
const app = express();

const bodyParser = require("body-parser");
const { userRoute } = require("./routes/userRoute");
const http = require("http").Server(app);

const io = require("socket.io")(http);
const usp = io.of("/user-namescpace");

usp.on("connection", async (socket) => {
  console.log("User Connected");

  userModel.

  socket.on("disconnect", () => {
    console.log("User Disonnected");
  });
});

const PORT = 8000;
mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", userRoute);

http.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
