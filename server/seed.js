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
    description:
      "A comprehensive deep-dive into the technological breakthroughs of 2023. This summit features keynote speakers from industry giants like Google, OpenAI, and NVIDIA, discussing the rapid evolution of Generative AI, silicon architecture, and the future of decentralized computing. Ideal for developers, CTOs, and tech enthusiasts looking to understand the foundations of tomorrow.",
    capacity: 1000,
    availableSeats: 0,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c89e12076d22?q=80&w=1000&auto=format&fit=crop",
    price: 299,
  },
  {
    name: "AI & Future Expo",
    organizer: "NextGen AI",
    date: new Date("2026-05-20T09:00:00"),
    location: "Silicon Valley, CA",
    description:
      "Step into the year 2025 at the world's premier AI exposition. Experience hands-on demonstrations of autonomous robotics, real-time neural translation, and next-generation LLMs. This expo brings together researchers and startups to showcase how AI is transforming healthcare, transportation, and creative arts. Don't miss the future, experience it today.",
    capacity: 500,
    availableSeats: 500,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    price: 150,
  },
  {
    name: "Jazz Under the Stars",
    organizer: "Smooth Rhythms",
    date: new Date("2026-03-15T19:00:00"),
    location: "New Orleans, LA",
    description:
      "Join us for an intimate evening in the heart of the French Quarter. This open-air concert features world-renowned jazz quintets performing under the moonlight. Enjoy the soul-stirring melodies of local legends and international guests, accompanied by gourmet Southern appetizers and craft cocktails. A must-attend for music lovers seeking a sophisticated atmosphere.",
    capacity: 200,
    availableSeats: 50,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    price: 75,
  },
  {
    name: "Summer Rock Festival",
    organizer: "FestEvents",
    date: new Date("2026-07-12T14:00:00"),
    location: "Chicago, IL",
    description:
      "Get ready to loud! Chicago's biggest summer rock festival returns with three stages, twenty bands, and twelve hours of non-stop energy. Featuring massive headliners from the modern rock scene along with rising indie stars. With food trucks, merchandise villages, and an immersive light show, this is the ultimate high-octane experience of the season.",
    capacity: 5000,
    availableSeats: 5000,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=1000&auto=format&fit=crop",
    price: 120,
  },
  {
    name: "Modern Art Showcase",
    organizer: "The Gallery",
    date: new Date("2026-10-05T11:00:00"),
    location: "New York, NY",
    description:
      "Explore the boundaries of visual expression at our annual Modern Art Showcase. curated by world-class historians, this exhibition features avant-garde sculptures, immersive digital installations, and thought-provoking abstract paintings. Meet the artists behind the work during our evening reception and gain insight into the inspirations driving today's creative movements.",
    capacity: 300,
    availableSeats: 10,
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdc8a8b?q=80&w=1000&auto=format&fit=crop",
    price: 45,
  },
  {
    name: "Digital Arts Workshop",
    organizer: "Creative Studio",
    date: new Date("2025-04-10T10:00:00"),
    location: "London, UK",
    description:
      "Learn to create stunning digital illustrations from professional concept artists. This hands-on workshop covers advanced techniques in Procreate and Photoshop, focusing on light theory, character design, and environment building. Whether you're a hobbyist or a professional, this intensive day-long session will elevate your digital craft to new heights.",
    capacity: 50,
    availableSeats: 50,
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1000&auto=format&fit=crop",
    price: 199,
  },
  {
    name: "Business Strategy Weekend",
    organizer: "Elite Partners",
    date: new Date("2023-10-20T09:00:00"),
    location: "Austin, TX",
    description:
      "An intensive masterclass designed for entrepreneurs and business leaders. Analyze current market trends, develop scalable growth models, and network with high-level investors. This weekend retreat focuses on actionable strategies to navigate the post-digital economy, providing the tools needed to lead your organization to sustainable success.",
    capacity: 150,
    availableSeats: 0,
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    price: 450,
  },
  {
    name: "Food Truck Carnival",
    organizer: "Urban Eats",
    date: new Date("2025-06-18T12:00:00"),
    location: "Portland, OR",
    description:
      "Indulge in a culinary journey through the best street food the nation has to offer. Over fifty award-winning food trucks gather for one weekend, offering everything from fusion tacos to artisanal ice cream. Live cooking demonstrations, local craft beer tents, and a family-friendly atmosphere make this the highlight of the summer food scene.",
    capacity: 2000,
    availableSeats: 2000,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=1000&auto=format&fit=crop",
    price: 15,
  },
  {
    name: "International Marathon",
    organizer: "RunGlobal",
    date: new Date("2025-09-05T06:00:00"),
    location: "Boston, MA",
    description:
      "Join thousands of runners from across the globe in one of the most prestigious marathons in the world. Experience the historic 26.2-mile course, cheered on by over a million spectators. Whether you're chasing a personal best or simply aiming to cross the finish line, this race represents the pinnacle of athletic endurance and community spirit.",
    capacity: 10000,
    availableSeats: 10000,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?q=80&w=1000&auto=format&fit=crop",
    price: 80,
  },
  {
    name: "Startup Pitch Night",
    organizer: "Angel Network",
    date: new Date("2026-03-25T18:30:00"),
    location: "Online",
    description:
      "The next big thing starts here. Watch ten high-potential startups pitch their vision to a panel of expert VCs and angel investors. This event offers a unique look at emerging business models and disruptive technologies. Attendees will have the opportunity to participate in Q&A sessions and network during our virtual breakout rooms.",
    capacity: 500,
    availableSeats: 500,
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    price: 25,
  },
  {
    name: "Annual Charity Gala",
    organizer: "Heart to Heart Foundation",
    date: new Date("2024-12-05T19:00:00"),
    location: "Grand Ballroom, NY",
    description:
      "An elegant evening dedicated to raising funds for local children's hospitals. Enjoy a five-course dinner, silent auction, and live performances by orchestral musicians. A night of glamour with a profound purpose.",
    capacity: 300,
    availableSeats: 0,
    category: "Charity",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop",
    price: 500,
  },
  {
    name: "Future Fashion Week",
    organizer: "Vogue Forward",
    date: new Date("2025-08-20T10:00:00"),
    location: "Milan, Italy",
    description:
      "Experience the intersection of haute couture and technology. Featuring smart fabrics, 3D-printed accessories, and sustainable designs from the world's leading emerging designers.",
    capacity: 1000,
    availableSeats: 1000,
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
    price: 350,
  },
  {
    name: "Space Exploration Exhibit",
    organizer: "Cosmos Museum",
    date: new Date("2025-11-12T09:00:00"),
    location: "Houston, TX",
    description:
      "Walk through a life-sized model of the Mars rover and touch a real moon rock. This immersive exhibit explores the history of human spaceflight and the future of lunar colonies.",
    capacity: 400,
    availableSeats: 400,
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1000&auto=format&fit=crop",
    price: 20,
  },
  {
    name: "Yoga on the Beach",
    organizer: "Zen Life",
    date: new Date("2025-06-01T07:00:00"),
    location: "Malibu, CA",
    description:
      "Start your morning with guided meditation and sun salutations as the waves crash against the shore. Suitable for all levels, followed by a light organic breakfast.",
    capacity: 50,
    availableSeats: 50,
    category: "Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    price: 30,
  },
  {
    name: "Indie Film Marathon",
    organizer: "Cinema Underground",
    date: new Date("2024-05-15T12:00:00"),
    location: "Seattle, WA",
    description:
      "A 24-hour celebration of independent cinema. Screening award-winning shorts and features from around the world, followed by director Q&A sessions.",
    capacity: 150,
    availableSeats: 0,
    category: "Film",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    price: 40,
  },
  {
    name: "Vintage Wine Tasting",
    organizer: "Heritage Vineyards",
    date: new Date("2026-02-10T18:00:00"),
    location: "Napa Valley, CA",
    description:
      "Sample rare vintages from our private cellar. Our lead sommelier will guide you through the complex flavor profiles of aged Cabernet Sauvignons and buttery Chardonnays.",
    capacity: 30,
    availableSeats: 5,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop",
    price: 150,
  },
  {
    name: "Retro Gaming Tournament",
    organizer: "Pixels & Joy",
    date: new Date("2025-12-05T10:00:00"),
    location: "Tokyo, Japan",
    description:
      "Compete in the ultimate Mario Kart and Street Fighter tournament on original vintage consoles. Prizes for top scorers and best cosplay.",
    capacity: 200,
    availableSeats: 200,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    price: 15,
  },
  {
    name: "Global Health Forum",
    organizer: "Wellness Without Borders",
    date: new Date("2024-03-20T09:00:00"),
    location: "Geneva, Switzerland",
    description:
      "Bringing together world leaders and health experts to discuss pandemic preparedness and equitable vaccine distribution. A critical dialogue for a safer world.",
    capacity: 800,
    availableSeats: 0,
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
    price: 0,
  },
  {
    name: "Street Art Festival",
    organizer: "Urban Colors",
    date: new Date("2025-09-15T11:00:00"),
    location: "Brooklyn, NY",
    description:
      "Watch live mural painting by the city's best graffiti artists. Featuring live DJs, breakdancing battles, and street food stalls.",
    capacity: 3000,
    availableSeats: 3000,
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000&auto=format&fit=crop",
    price: 0,
  },
  {
    name: "Winter Wonderland Run",
    organizer: "Cold Rush Athletics",
    date: new Date("2025-12-20T08:00:00"),
    location: "Denver, CO",
    description:
      "A scenic 10k run through snow-covered parks. Warm up at the finish line with hot cocoa and a festive holiday medal.",
    capacity: 500,
    availableSeats: 500,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?q=80&w=1000&auto=format&fit=crop",
    price: 50,
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
