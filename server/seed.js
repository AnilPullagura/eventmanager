const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Event = require("./models/Event");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const categories = [
  "Technology",
  "Music",
  "Art",
  "Business",
  "Food",
  "Sports",
  "Charity",
  "Fashion",
  "Science",
  "Wellness",
  "Film",
];

const generateEvents = (count) => {
  const events = [];

  for (let i = 0; i < count; i++) {
    const capacity = faker.number.int({ min: 20, max: 2000 });
    const category = faker.helpers.arrayElement(categories);

    // Available seats should be logically less than or equal to capacity
    const availableSeats = faker.number.int({ min: 0, max: capacity });

    events.push({
      name: faker.company.catchPhrase(),
      organizer: faker.company.name(),
      date: faker.date.future(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      description: faker.lorem.paragraphs(2),
      capacity: capacity,
      availableSeats: availableSeats,
      category: category,
      imageUrl: faker.image.urlLoremFlickr({
        width: 1000,
        height: 600,
        category: category.toLowerCase(),
      }),
      price: faker.number.int({ min: 0, max: 500 }),
    });
  }

  return events;
};

const importData = async () => {
  try {
    // 1. Clear existing data
    await Event.deleteMany({});
    console.log("-----------------------------------------");
    console.log("🧹 Old Event Data Cleared!");

    // 2. Generate new data
    const numEvents = 100;
    const items = generateEvents(numEvents);

    // 3. Insert into MongoDB
    await Event.insertMany(items);

    console.log(`✅ Success: ${numEvents} Professional Events Imported!`);
    console.log("-----------------------------------------");
    process.exit();
  } catch (error) {
    console.error(`❌ Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
