const express = require("express");
const multer = require("multer")
const router = express.Router();
const uploadFile = require("../service/song.service")
const upload = multer({ storage: multer.memoryStorage() });
const songModel = require("../models/songs.model")

router.get("/", (req, res) => res.json({ message: "Hello World !" }));

router.post("/songs", upload.single("audio"), async (req, res) => {
    console.log(req.body);

    const file = await uploadFile(req.file);
    const song = await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        audio: file.url,
        mood: req.body.mood
    })
    res.status(201).json({ message: "Song Created !", song: song })
})

router.get("/allSongs", async (req, res) => {
    const { mood } = req.query;
    const songs = await songModel.find({ mood: mood });
    res.status(200).json({ message: "All Songs Fetched !", songs: songs });
});
module.exports = router 