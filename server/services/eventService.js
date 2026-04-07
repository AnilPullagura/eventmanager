const Event = require("../models/Event");
const User = require("../models/User");

exports.getAllEvents = async (search, page, limit, skip) => {
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
  const events = await Event.find(query).skip(skip).limit(limit);
  if (events) {
    return events;
  } else {
    throw new Error("failed to fetch events");
  }
};

exports.getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

exports.registerUserForEvent = async (eventId, userId) => {
  const event = await Event.findOneAndUpdate(
    {
      _id: eventId,
      availableSeats: { $gt: 0 },
      attendees: { $ne: userId },
    },
    {
      $inc: { availableSeats: -1 },
      $push: { attendees: userId },
    },
    { new: true },
  );

  if (!event) {
    throw new Error("Event is full");
  }

  const user = await User.findById(userId);
  if (user) {
    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }
  }
  return event;
};

exports.cancelUserRegistration = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  if (!event.attendees.includes(userId)) {
    throw new Error("User not registered for this event");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
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
};

exports.createNewEvent = async (eventData) => {
  const {
    name,
    organizer,
    date,
    location,
    description,
    capacity,
    category,
    imageUrl,
    price,
  } = eventData;
  if (
    !name ||
    !organizer ||
    !date ||
    !location ||
    !description ||
    !capacity ||
    !category ||
    !imageUrl ||
    !price
  ) {
    throw new Error("all fields are required");
  }
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
    price,
  });
  const savedEvent = await newEvent.save();
  return savedEvent;
};

exports.deleteEventById = async (eventId) => {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  await User.updateMany(
    { registeredEvents: eventId },
    { $pull: { registeredEvents: eventId } },
  );
  return event;
};

exports.getAllRegisteredEvents = async (userId) => {
  const user = await User.findById(userId).populate("registeredEvents");
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};
