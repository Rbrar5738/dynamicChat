const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { userRoute } = require("./routes/userRoute");

mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use("/", userRoute);

const http = require("http").Server(app);
const PORT = 8000;
http.listen(PORT, () => {
  console.log(`Server started att Port ${PORT}`);
});
