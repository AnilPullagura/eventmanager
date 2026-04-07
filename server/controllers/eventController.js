const eventService = require("../services/eventService");

exports.getEvents = async (req, res) => {
  try {
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const events = await eventService.getAllEvents(search, page, limit, skip);
    res.status(200).json({ data: events });
  } catch (err) {
    if (err.message === "failed to fetch events") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "server error" });
  }
};

exports.getEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(id);
    res.status(200).json({
      details: event,
    });
  } catch (err) {
    if (err.message === "Event not found") {
      return res.status(404).json({
        message: err.message,
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await eventService.registerUserForEvent(eventId, userId);
    res
      .status(200)
      .json({ message: "Registration successful", details: event });
  } catch (error) {
    if (error.message === "Event is full") {
      return res
        .status(400)
        .json({ message: "Event is full or you already registered" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await eventService.cancelUserRegistration(eventId, userId);

    res.status(204).json({ message: "Registration cancelled" });
  } catch (error) {
    if (error.message === "Event not found") {
      return res.status(404).json({ message: "Event not found" });
    }
    if (error.message === "User not registered for this event") {
      return res
        .status(400)
        .json({ message: "User is not registered for this event" });
    }
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const savedEvent = await eventService.createNewEvent(req.body);
    res
      .status(201)
      .json({ message: "Event created Successfully", details: savedEvent });
  } catch (err) {
    if (err.message === "all fields are required") {
      return res.status(400).json({ message: "all fields are required" });
    }
    res.status(500).json({ message: "Failed to create event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.deleteEventById(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (er) {
    if (er.message === "Event not found") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: "Failed to delete event" });
  }
};

exports.getMyRegisterdEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await eventService.getAllRegisteredEvents(userId);
    res.status(200).json({
      history_events: user.registeredEvents,
    });
  } catch (er) {
    if (er.message === "user not found") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "server error" });
  }
};
