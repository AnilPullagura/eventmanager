# 🎫 Event Pro — Full-Stack Event Management Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) application that allows users to discover, register for, and manage events. Admins can create & delete events and monitor platform analytics through a dedicated dashboard.

> **Live API**: `https://eventmanager-api.onrender.com`

---

## ✨ Features

### 👤 Users

- **Register & Login** with email and password (JWT-based sessions stored via cookies)
- **Browse events** with real-time search by name, location, or category
- **Register / Cancel** for events with automatic seat tracking
- **View registration history** of all events they've signed up for

### 🔑 Admins

- **Create new events** with details like price, capacity, image, category, etc.
- **Delete events** (automatically cleans up all user registrations)
- **Dashboard analytics** — view total events, total registrations, and revenue

### 🛡️ Security

- JWT authentication with 7-day token expiry
- Password hashing with **bcrypt** (10 salt rounds)
- Login **rate limiting** — max 10 attempts per IP every 10 minutes
- Role-based access control (`user` / `admin`)
- Protected routes on both frontend and backend

---

## 🛠️ Tech Stack

| Layer        | Technology                                                           |
| :----------- | :------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 7, React Router 7, Axios, react-toastify, react-icons |
| **Backend**  | Node.js, Express 4, Mongoose 7                                       |
| **Database** | MongoDB (Atlas)                                                      |
| **Auth**     | JSON Web Tokens (jsonwebtoken), bcrypt                               |
| **Security** | express-rate-limit                                                   |
| **State**    | React Context API, js-cookie                                         |

---

## 📂 Project Structure

```
event-management-app/
├── client/                         # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/              # Admin dashboard, event creation, event list
│   │   │   ├── EventDetails/       # Individual event page (register/cancel)
│   │   │   ├── Events/             # Event cards listing with search
│   │   │   ├── Header/             # Navigation bar with logout
│   │   │   ├── History/            # User's registered events history
│   │   │   ├── Home/               # Landing page with search bar
│   │   │   ├── ProtectedRoute/     # Auth guard (redirects to /login)
│   │   │   └── login/              # Login & Register forms
│   │   ├── context/                # React Context (user state)
│   │   ├── App.jsx                 # Root component with routing
│   │   └── main.jsx                # Vite entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                         # Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, Fetch User
│   │   ├── eventController.js      # CRUD + Registration/Cancellation
│   │   └── adminController.js      # Dashboard statistics (aggregation)
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verify (protect) & admin check
│   │   └── loginLimiter.js         # Rate limiter for login route
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Event.js                # Event schema
│   ├── routes/
│   │   ├── index.js                # Route aggregator
│   │   ├── authRoutes.js           # /api/auth/*
│   │   ├── eventRoutes.js          # /api/events/*
│   │   └── adminRoutes.js          # /api/admin/*
│   ├── Utils/
│   │   └── jwtGenerator.js         # Token signing helper (7-day expiry)
│   ├── seed.js                     # Database seeder with sample events
│   ├── index.js                    # Entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Models

### User

| Field              | Type       | Details                         |
| :----------------- | :--------- | :------------------------------ |
| `name`             | String     | Required                        |
| `email`            | String     | Required, Unique                |
| `password`         | String     | Hashed with bcrypt              |
| `role`             | String     | `"user"` (default) or `"admin"` |
| `registeredEvents` | ObjectId[] | References `Event` documents    |
| `createdAt`        | Date       | Auto-generated (timestamps)     |

### Event

| Field            | Type       | Details                         |
| :--------------- | :--------- | :------------------------------ |
| `name`           | String     | Required                        |
| `organizer`      | String     | Required                        |
| `date`           | Date       | Required                        |
| `location`       | String     | Required                        |
| `description`    | String     | Required                        |
| `capacity`       | Number     | Total spots                     |
| `availableSeats` | Number     | Remaining spots (auto-managed)  |
| `category`       | String     | e.g. Tech, Music, Art           |
| `imageUrl`       | String     | Event banner/image URL          |
| `price`          | Number     | Ticket price                    |
| `attendees`      | ObjectId[] | Users registered for this event |
| `createdAt`      | Date       | Auto-generated (timestamps)     |

---

## 🚀 API Endpoints

**Base URL**: `/api`

### Authentication — `/api/auth`

| Method | Endpoint    | Description                            | Body                        | Notes                       |
| :----- | :---------- | :------------------------------------- | :-------------------------- | :-------------------------- |
| `POST` | `/register` | Create a new user account              | `{ name, email, password }` | Hashes password before save |
| `POST` | `/login`    | Authenticate & receive JWT + user info | `{ email, password }`       | **Rate limited** (10/10min) |
| `POST` | `/user`     | Fetch user details (excludes password) | `{ userId }`                |                             |

### Events — `/api/events`

| Method   | Endpoint        | Auth       | Description                          | Notes                                                                   |
| :------- | :-------------- | :--------- | :----------------------------------- | :---------------------------------------------------------------------- |
| `GET`    | `/`             | Public     | List all events                      | Supports `?search=query` (searches name, location, category)            |
| `GET`    | `/:id`          | Protected  | Get single event by ID               | Returns 404 if not found                                                |
| `POST`   | `/`             | Admin only | Create a new event                   | Sets `availableSeats = capacity`                                        |
| `DELETE` | `/:id`          | Admin only | Delete an event                      | Also removes event from all users' `registeredEvents`                   |
| `POST`   | `/:id/register` | Protected  | Register for an event                | Atomic update — checks seats & duplicate registration in a single query |
| `POST`   | `/:id/cancel`   | Protected  | Cancel event registration            | Increments `availableSeats`, removes user from `attendees`              |
| `GET`    | `/history`      | Protected  | Get current user's registered events | Populates full event details                                            |

### Admin — `/api/admin`

| Method | Endpoint | Auth       | Description                                                 |
| :----- | :------- | :--------- | :---------------------------------------------------------- |
| `GET`  | `/stats` | Admin only | Dashboard stats: total events, total registrations, revenue |

> Revenue is calculated via MongoDB aggregation: `attendees count × event price` per event, summed across all events.

---

## 🔒 Middleware

| Middleware         | File                        | Purpose                                                            |
| :----------------- | :-------------------------- | :----------------------------------------------------------------- |
| `protect`          | `middleware/authMiddleware` | Verifies `Bearer <token>` in `Authorization` header, attaches user |
| `admin`            | `middleware/authMiddleware` | Checks `req.user.role === "admin"`, returns 401 otherwise          |
| `loginRateLimiter` | `middleware/loginLimiter`   | 10 requests / 10 minutes per IP on login; returns 429 on excess    |

---

## 🖥️ Frontend Pages

| Route         | Component      | Description                                                |
| :------------ | :------------- | :--------------------------------------------------------- |
| `/login`      | `Login`        | Login & Register forms with toggle; redirects if logged in |
| `/`           | `Home`         | Hero section + search bar + event cards listing            |
| `/events/:id` | `EventDetails` | Full event info with register/cancel actions               |
| `/history`    | `History`      | List of events the user has registered for                 |
| `/admin`      | `Admin`        | Dashboard stats + create event form + manage events list   |

All routes except `/login` are wrapped in a `ProtectedRoute` component that redirects unauthenticated users to `/login`. Admin users are redirected to `/admin` upon login.

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd event-management-app
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Seed the database with sample events (optional):

```bash
npm run seed
```

Start the server:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

> The frontend dev server runs on `http://localhost:5173` by default (Vite).
> The backend API runs on `http://localhost:5000`.

---

## ⚙️ Environment Variables

| Variable     | Description                       | Example                              |
| :----------- | :-------------------------------- | :----------------------------------- |
| `PORT`       | Server port                       | `5000`                               |
| `MONGO_URI`  | MongoDB connection string         | `mongodb+srv://user:pass@cluster/db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `my_super_secret_key`                |

---

## 📜 Available Scripts

### Server (`/server`)

| Script         | Command            | Description                    |
| :------------- | :----------------- | :----------------------------- |
| `npm start`    | `node index.js`    | Start production server        |
| `npm run dev`  | `nodemon index.js` | Start with auto-restart        |
| `npm run seed` | `node seed.js`     | Seed database with sample data |

### Client (`/client`)

| Script            | Command        | Description              |
| :---------------- | :------------- | :----------------------- |
| `npm run dev`     | `vite`         | Start dev server         |
| `npm run build`   | `vite build`   | Build for production     |
| `npm run preview` | `vite preview` | Preview production build |
| `npm run lint`    | `eslint .`     | Run ESLint               |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
