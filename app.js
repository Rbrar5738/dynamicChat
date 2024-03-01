const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const io = require("socket.io")(http);

const bodyParser = require("body-parser");
const { userRoute } = require("./routes/userRoute");
const http = require("http").Server(app);
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
