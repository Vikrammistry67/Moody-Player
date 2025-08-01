const express = require('express');
const app = express();
const cors = require('cors');
const songRoute = require("./Routes/songs.route")
app.use(express.json());
app.use(cors())
app.use("/", songRoute)
app.use("/api", songRoute);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.use("/api/allSongs", songRoute);

module.exports = app;