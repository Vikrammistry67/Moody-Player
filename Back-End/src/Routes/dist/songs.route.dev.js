"use strict";

var express = require("express");

var multer = require("multer");

var router = express.Router();

var uploadFile = require("../service/song.service");

var upload = multer({
  storage: multer.memoryStorage()
});

var songModel = require("../models/songs.model");

router.get("/", function (req, res) {
  return res.json({
    message: "Hello World !"
  });
});
router.post("/songs", upload.single("audio"), function _callee(req, res) {
  var file, song;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(uploadFile(req.file));

        case 3:
          file = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: file.url,
            mood: req.body.mood
          }));

        case 6:
          song = _context.sent;
          res.status(201).json({
            message: "Song Created !",
            song: song
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/allSongs", function _callee2(req, res) {
  var mood, songs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mood = req.query.mood;
          _context2.next = 3;
          return regeneratorRuntime.awrap(songModel.find({
            mood: mood
          }));

        case 3:
          songs = _context2.sent;
          res.status(200).json({
            message: "All Songs Fetched !",
            songs: songs
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;