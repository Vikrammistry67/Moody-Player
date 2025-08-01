const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    mood: String,
    audio: String
});
module.exports = mongoose.model("Song", songSchema);