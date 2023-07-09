const express = require("express");
const path = require("path");
const router = express.Router();

const streamerController = require("../controllers/streamerController");

router.get("/streamers", streamerController.getAllStreamers);

router.post("/streamers", streamerController.postStreamer);

router.get("/streamer/:id", streamerController.getStreamer);

router.put("/streamers/:id/:vote", streamerController.putVoteStreamer);


module.exports = router;
