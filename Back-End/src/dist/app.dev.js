"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var songRoute = require("./Routes/songs.route");

app.use(express.json());
app.use(cors());
app.use("/", songRoute);
app.use("/api", songRoute);
app.use(function (req, res) {
  res.status(404).json({
    message: "Route not found"
  });
});
app.use("/api/allSongs", songRoute);
module.exports = app;