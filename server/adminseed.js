const User = require("./models/User");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = "eventadmin123@gmail.com";
    const user = await User.findOne({ email: adminEmail });

    if (user) {
      console.log("admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("eventadmin", 10);
    await User.create({
      name: "Anil",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("admin created successfully");
    process.exit(0);
  } catch (er) {
    console.error("Error seeding admin:", er);
    process.exit(1);
  }
};

seedAdmin();
