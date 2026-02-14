const express = require("express");
const router = express.Router();
const {
  getEvents,
  registerForEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getEvents);

router.post("/:id/register", protect, registerForEvent);

module.exports = router;
