const express = require("express");
const router = express.Router();
const {
  getEvents,
  registerForEvent,
  cancelRegistration,
  getEventsById,
  createEvent,
  deleteEvent,
  getMyRegisterdEvents,
} = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, admin, createEvent);
router.delete("/:id", protect, admin, deleteEvent);
router.get("/history", protect, getMyRegisterdEvents);
router.post("/:id/register", protect, registerForEvent);
router.post("/:id/cancel", protect, cancelRegistration);
router.get("/:id", protect, getEventsById);

module.exports = router;
