const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const sampleEvents = [
  {
    name: "Global Tech Summit 2023",
    organizer: "Tech Innovators",
    date: new Date("2023-11-10T10:00:00"),
    location: "Virtual / San Francisco",
    description: "A retrospective on the biggest tech shifts of 2023.",
    capacity: 1000,
    availableSeats: 0,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c89e12076d22?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "AI & Future Expo",
    organizer: "NextGen AI",
    date: new Date("2025-05-20T09:00:00"),
    location: "Silicon Valley, CA",
    description: "Exploring the next frontier of Artificial Intelligence.",
    capacity: 500,
    availableSeats: 500,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Jazz Under the Stars",
    organizer: "Smooth Rhythms",
    date: new Date("2024-01-15T19:00:00"),
    location: "New Orleans, LA",
    description: "A magical evening of live jazz music.",
    capacity: 200,
    availableSeats: 50,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Summer Rock Festival",
    organizer: "FestEvents",
    date: new Date("2025-07-12T14:00:00"),
    location: "Chicago, IL",
    description: "The biggest rock festival of the summer!",
    capacity: 5000,
    availableSeats: 5000,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Modern Art Showcase",
    organizer: "The Gallery",
    date: new Date("2024-02-05T11:00:00"),
    location: "New York, NY",
    description: "Featuring works from leading contemporary artists.",
    capacity: 300,
    availableSeats: 10,
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdc8a8b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Digital Arts Workshop",
    organizer: "Creative Studio",
    date: new Date("2025-04-10T10:00:00"),
    location: "London, UK",
    description: "Hands-on workshop for digital illustration.",
    capacity: 50,
    availableSeats: 50,
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Business Strategy Weekend",
    organizer: "Elite Partners",
    date: new Date("2023-10-20T09:00:00"),
    location: "Austin, TX",
    description: "Mastering market trends and growth strategies.",
    capacity: 150,
    availableSeats: 0,
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Food Truck Carnival",
    organizer: "Urban Eats",
    date: new Date("2025-06-18T12:00:00"),
    location: "Portland, OR",
    description: "Sample the best street food in the country.",
    capacity: 2000,
    availableSeats: 2000,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "International Marathon",
    organizer: "RunGlobal",
    date: new Date("2025-09-05T06:00:00"),
    location: "Boston, MA",
    description: "The ultimate test of endurance.",
    capacity: 10000,
    availableSeats: 10000,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Startup Pitch Night",
    organizer: "Angel Network",
    date: new Date("2025-03-25T18:30:00"),
    location: "Online",
    description: "Watch the next big startups pitch their ideas.",
    capacity: 500,
    availableSeats: 500,
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
  },
];

const importData = async () => {
  try {
    await Event.deleteMany({});
    console.log("Old Data Cleared!");
    await Event.insertMany(sampleEvents);
    console.log("New Fresh Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
