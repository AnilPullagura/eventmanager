# Backend Documentation - Event Management App

This README provides a comprehensive overview of the backend structure, logic, and API endpoints for the Event Management application. It is designed to give you a complete understanding without needing to open every folder.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt (for password hashing)

## 📂 Project Structure

- **`index.js`**: The entry point. Initializes the Express app, connects to the database, sets up middleware (CORS, JSON parsing), and defines the base API route `/api`.
- **`config/db.js`**: Handles the connection to MongoDB.
- **`models/`**: Mongoose schemas defining the data structure for Users and Events.
- **`routes/`**: Defines the API endpoints and maps them to controller functions.
- **`controllers/`**: Contains the business logic for each endpoint (handling requests, DB operations, responses).
- **`middleware/`**: Contains `authMiddleware.js` for protecting routes using JWT verification.
- **`Utils/`**: Helper functions (e.g., generating JWT tokens).

---

## 🗄 Database Models

### 1. User (`User.js`)

Represents a registered user of the platform.

- **`name`**: String (Required)
- **`email`**: String (Required, Unique)
- **`password`**: String (Hashed)
- **`registeredEvents`**: Array of ObjectIds (Ref: `Event`) - Tracks events the user has signed up for.

### 2. Event (`Event.js`)

Represents an event created on the platform.

- **`name`**: String (Required)
- **`organizer`**: String (Required)
- **`date`**: Date (Required)
- **`location`**: String (Required)
- **`description`**: String (Required)
- **`capacity`**: Number (Total spots)
- **`availableSeats`**: Number (Remaining spots)
- **`category`**: String (e.g., Tech, Music)
- **`attendees`**: Array of ObjectIds (Ref: `User`) - Tracks users registered for this event.

---

## 🔐 Authentication & Middleware

The backend uses **JWT (JSON Web Token)** for securing endpoints.

- **Middleware**: `middleware/authMiddleware.js`
- **Function**: `protect`
- **Logic**:
  1. Checks for the `Authorization` header in the request (Format: `Bearer <token>`).
  2. Verifies the token using `JWT_SECRET`.
  3. Finds the user by ID and attaches it to `req.user`.
  4. If invalid or missing, returns `401 Unauthorized`.

---

## 🚀 API Endpoints

**Base URL**: `/api`

### 1. Authentication Routes (`/api/auth`)

| Method   | Endpoint    | Description                                         | Body Parameters             |
| :------- | :---------- | :-------------------------------------------------- | :-------------------------- |
| **POST** | `/register` | Register a new user. Hashes password before saving. | `{ name, email, password }` |
| **POST** | `/login`    | Authenticate user. Returns JWT and user info.       | `{ email, password }`       |
| **POST** | `/user`     | Fetch user details by ID.                           | `{ userId }`                |

### 2. Event Routes (`/api/events`)

| Method   | Endpoint        | Protected? | Description                         | Logic / Notes                                                                                                                                                                                         |
| :------- | :-------------- | :--------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET**  | `/`             | No         | Get all events.                     | **Search**: Supports `?search=query` to filter by name, location, or category (case-insensitive regex).                                                                                               |
| **GET**  | `/:id`          | **Yes**    | Get event details by ID.            | Returns 404 if event not found.                                                                                                                                                                       |
| **POST** | `/:id/register` | **Yes**    | Register current user for an event. | 1. Checks if event exists & has seats.<br>2. Checks if user already registered.<br>3. Adds user to `event.attendees`.<br>4. Adds event to `user.registeredEvents`.<br>5. Decrements `availableSeats`. |
| **POST** | `/:id/cancel`   | **Yes**    | Cancel registration.                | 1. Checks if user is registered.<br>2. Removes user from `event.attendees`.<br>3. Removes event from `user.registeredEvents`.<br>4. Increments `availableSeats`.                                      |

---

## ⚙️ Environment Variables (.env)

Ensure these are set in your `.env` file:

- `PORT`: Server port (default matches code, usually 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing tokens
