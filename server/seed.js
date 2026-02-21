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
  {
    name: "City Marathon",
    organizer: "Health First",
    date: new Date("2024-09-01T06:00:00"),
    location: "Boston, MA",
    description: "Annual city marathon for all ages.",
    capacity: 2000,
    availableSeats: 2000,
    category: "Sports",
  },
  {
    name: "Food Truck Festival",
    organizer: "Tasty Eats",
    date: new Date("2024-08-25T11:00:00"),
    location: "Portland, OR",
    description: "Best food trucks from around the city.",
    capacity: 1500,
    availableSeats: 1500,
    category: "Food",
  },
  {
    name: "Indie Film Festival",
    organizer: "Cinema Club",
    date: new Date("2024-10-12T16:00:00"),
    location: "Los Angeles, CA",
    description: "Screening of independent films.",
    capacity: 400,
    availableSeats: 400,
    category: "Entertainment",
  },
  {
    name: "Gaming Expo",
    organizer: "Gamer Zone",
    date: new Date("2024-11-20T10:00:00"),
    location: "Seattle, WA",
    description: "Latest in video games and e-sports.",
    capacity: 3000,
    availableSeats: 3000,
    category: "Technology",
  },
  {
    name: "Book Fair",
    organizer: "Readers Block",
    date: new Date("2024-09-05T09:00:00"),
    location: "Denver, CO",
    description: "Meet authors and discover new books.",
    capacity: 600,
    availableSeats: 600,
    category: "Education",
  },
];

const importData = async () => {
  try {
    await Event.insertMany(sampleEvents);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
