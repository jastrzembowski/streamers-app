const Streamer = require("../models/streamer");
const { body, validationResult } = require("express-validator");

exports.getAllStreamers = async (req, res, next) => {
  try {
    const streamers = await Streamer.findAll();
    res.json(streamers);
    if (!streamers) {
      return res.status(404).json({ error: "Unable to fetch streamers" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve streamers" });
  }
};

exports.getStreamer = async (req, res, next) => {
  const id = req.params.id;

  try {
    const streamer = await Streamer.findByPk(id);
    if (!streamer) {
      return res.status(404).json({ error: "Streamer not found" });
    }
    res.json(streamer);
  } catch (err) {
    console.log(err);
  }
};

exports.putVoteStreamer = [
  async (req, res, next) => {
    const id = req.params.id;
    const vote = req.params.vote;

    try {
      const streamer = await Streamer.findByPk(id);
      if (!streamer) {
        return res.status(404).json({ error: "Streamer not found" });
      }
      if (vote !== "upvote" && vote !== "downvote") {
        return res.status(400).json({ error: "Invalid vote type" });
      }
      if (vote == "upvote") {
        streamer.vote += 1;
      } else if (vote == "downvote") {
        streamer.vote -= 1;
      }
      await streamer.save();
      return streamer;
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
];

exports.postStreamer = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("service").notEmpty().withMessage("Service is required"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, description, service, vote } = req.body;

      const streamer = await Streamer.create({
        name,
        description,
        service,
        vote,
      });

      res.status(201).json(streamer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create streamer" });
    }
  },
];
