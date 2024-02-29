const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");

mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

app.use("/", userRoute);

const http = require("http").Server(app);
const PORT = 8000;
http.listen(PORT, () => {
  console.log(`Server started att Port ${PORT}`);
});
