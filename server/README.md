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
- **`middleware/`**:
  - `authMiddleware.js`: Handles JWT verification (`protect`) and admin authorization (`admin`).
  - `loginLimiter.js`: Implements rate limiting for the login endpoint to prevent brute-force attacks.
- **`Utils/`**: Helper functions (e.g., generating JWT tokens).

---

## 🗄 Database Models

### 1. User (`User.js`)

Represents a registered user of the platform.

- **`name`**: String (Required)
- **`email`**: String (Required, Unique)
- **`password`**: String (Hashed)
- **`role`**: String ("user" or "admin", Default: "user") - Determines access levels.
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

### 1. Protection Middleware (`protect`)

The backend uses **JWT (JSON Web Token)** for securing endpoints.

- **File**: `middleware/authMiddleware.js`
- **Logic**:
  1. Checks for the `Authorization` header (`Bearer <token>`).
  2. Verifies the token using `JWT_SECRET`.
  3. Finds the user by ID and attaches it to `req.user`.

### 2. Admin Authorization (`admin`)

Ensures only users with the `admin` role can access specific routes.

- **File**: `middleware/authMiddleware.js`
- **Logic**: Checks `req.user.role`. If not `"admin"`, returns `401 Unauthorized`.

### 3. Rate Limiting (`loginRateLimiter`)

Protects against brute-force attacks on the login endpoint.

- **File**: `middleware/loginLimiter.js`
- **Configuration**:
  - **Window**: 10 minutes.
  - **Max Requests**: 10 per IP.
  - **Response**: Returns 429 after limit is exceeded.

---

## 🚀 API Endpoints

**Base URL**: `/api`

### 1. Authentication Routes (`/api/auth`)

| Method   | Endpoint    | Description                                         | Body Parameters             | Notes                        |
| :------- | :---------- | :-------------------------------------------------- | :-------------------------- | :--------------------------- |
| **POST** | `/register` | Register a new user. Hashes password before saving. | `{ name, email, password }` |                              |
| **POST** | `/login`    | Authenticate user. Returns JWT and user info.       | `{ email, password }`       | **Rate Limited** (10req/10m) |
| **POST** | `/user`     | Fetch user details by ID.                           | `{ userId }`                |                              |

### 2. Event Routes (`/api/events`)

| Method     | Endpoint        | Protected? | Description                         | Logic / Notes                                                                                                                                                                                         |
| :--------- | :-------------- | :--------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET**    | `/`             | No         | Get all events.                     | **Search**: Supports `?search=query` to filter by name, location, or category (case-insensitive regex).                                                                                               |
| **GET**    | `/:id`          | **Yes**    | Get event details by ID.            | Returns 404 if event not found.                                                                                                                                                                       |
| **GET**    | `/history`      | **Yes**    | Get user's registered events.       | Uses `.populate()` to return full event details for all events the user has registered for.                                                                                                           |
| **POST**   | `/`             | **Admin**  | Create a new event.                 | Only accessible to users with `admin` role. Sets `availableSeats` equal to `capacity`.                                                                                                                |
| **DELETE** | `/:id`          | **Admin**  | Delete an event.                    | 1. Removes event from DB.<br>2. Automatically pulls the event ID from all users' `registeredEvents` array to maintain data integrity.                                                                 |
| **POST**   | `/:id/register` | **Yes**    | Register current user for an event. | 1. Checks if event exists & has seats.<br>2. Checks if user already registered.<br>3. Adds user to `event.attendees`.<br>4. Adds event to `user.registeredEvents`.<br>5. Decrements `availableSeats`. |
| **POST**   | `/:id/cancel`   | **Yes**    | Cancel registration.                | 1. Checks if user is registered.<br>2. Removes user from `event.attendees`.<br>3. Removes event from `user.registeredEvents`.<br>4. Increments `availableSeats`.                                      |

---

## ⚙️ Environment Variables (.env)

Ensure these are set in your `.env` file:

- `PORT`: Server port (default matches code, usually 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing tokens
