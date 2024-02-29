const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

const express = require("express");

const app = express();

const http = require("http").Server(app);
const PORT = 8000;
http.listen(PORT, () => {
  console.log(`Server started att Port ${PORT}`);
});
