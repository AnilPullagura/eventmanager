const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const sampleEvents = [
  {
    name: "Tech Conference 2024",
    organizer: "Tech World",
    date: new Date("2024-11-15T09:00:00"),
    location: "San Francisco, CA",
    description: "A global conference for tech enthusiasts.",
    capacity: 500,
    availableSeats: 500,
    category: "Technology",
  },
  {
    name: "Music Fest",
    organizer: "Live Beats",
    date: new Date("2024-12-10T18:00:00"),
    location: "Austin, TX",
    description: "An evening of live music and entertainment.",
    capacity: 1000,
    availableSeats: 1000,
    category: "Music",
  },
  {
    name: "Startup Summit",
    organizer: "Venture Capital",
    date: new Date("2024-10-05T10:00:00"),
    location: "New York, NY",
    description: "Networking event for startups and investors.",
    capacity: 200,
    availableSeats: 200,
    category: "Business",
  },
  {
    name: "Art Expo",
    organizer: "Creative Minds",
    date: new Date("2024-09-20T11:00:00"),
    location: "Chicago, IL",
    description: "Showcasing modern art from local artists.",
    capacity: 300,
    availableSeats: 300,
    category: "Art",
  },
  {
    name: "Coding Bootcamp Open House",
    organizer: "Dev Academy",
    date: new Date("2024-08-15T14:00:00"),
    location: "Online",
    description: "Learn about our coding bootcamps.",
    capacity: 100,
    availableSeats: 100,
    category: "Education",
  },
];

const importData = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(sampleEvents);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
