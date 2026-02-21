const express = require("express");
const router = express.Router();
const {
  getEvents,
  registerForEvent,
  cancelRegistration,
  getEventsById,
  createEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, admin, createEvent);
router.delete("/:id", protect, admin, deleteEvent);

router.post("/:id/register", protect, registerForEvent);
router.post("/:id/cancel", protect, cancelRegistration);
router.get("/:id", protect, getEventsById);

module.exports = router;
