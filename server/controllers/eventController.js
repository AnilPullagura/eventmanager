// Event Controller
const Event = require("../models/Event");
const User = require("../models/User");

exports.getEvents = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }
    const events = await Event.find(query);
    res.status(200).json({ data: events });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch events" });
  }
};

exports.getEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      details: event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch event",
    });
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

exports.cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(userId)) {
      return res.status(400).json({
        message: "User not registered for this event",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    event.attendees = event.attendees.filter(
      (id) => id.toString() !== userId.toString(),
    );
    event.availableSeats += 1;
    await event.save();

    user.registeredEvents = user.registeredEvents.filter(
      (id) => id.toString() !== eventId.toString(),
    );
    await user.save();

    res.status(200).json({ message: "Registration cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      organizer,
      date,
      location,
      description,
      capacity,
      category,
      imageUrl,
    } = req.body;
    const newEvent = new Event({
      name,
      organizer,
      date,
      location,
      description,
      capacity,
      availableSeats: capacity,
      category,
      imageUrl,
    });
    const savedEvent = await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created Successfully", details: savedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await User.updateMany(
      { registeredEvents: id },
      { $pull: { registeredEvents: id } },
    );

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (er) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};

exports.getMyRegisterdEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("registeredEvents");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      history_events: user.registeredEvents,
    });
  } catch (er) {
    res.status(500).json({ message: "server error" });
  }
};
