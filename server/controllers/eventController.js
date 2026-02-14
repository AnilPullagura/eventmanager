// Event Controller
const Event = require("../models/Event");
const User = require("../models/User");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ data: events });
  } catch (err) {
    res.status(401).json("failed to fetch events");
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    event.attendees.push(userId);
    event.availableSeats -= 1;
    await event.save();

    user.registeredEvents.push(eventId);
    await user.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
