const express = require("express");
const router = express.Router();
const {
  getEvents,
  registerForEvent,
  cancelRegistration,
  getEventsById,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getEvents);

router.post("/:id/register", protect, registerForEvent);
router.post("/:id/cancel", protect, cancelRegistration);
router.get("/:id", protect, getEventsById);

module.exports = router;
