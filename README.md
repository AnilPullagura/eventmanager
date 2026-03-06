# 🎫 Evently — Enterprise-Grade Event Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**Evently** (formerly Evently) is a robust, full-stack event management ecosystem built for high performance, scalability, and type safety. It features a modern React frontend and a secure Node.js backend, seamlessly integrated with a strictly typed TypeScript architecture.

> **Live API**: [https://eventmanager-api.onrender.com](https://eventmanager-api.onrender.com)

---

## 🏛️ System Architecture

### 🛡️ Backend (Node.js & Express)

A secure RESTful API layer utilizing a modular Controller-Route-Model (CRM) architecture.

- **Database**: MongoDB (Atlas) with Mongoose ODM.
- **Authentication**: JWT-based stateless authentication.
- **Security**:
  - Password hashing with Bcrypt.
  - API rate limiting via `express-rate-limit`.
  - Role-Based Access Control (RBAC) specifically tailored for `Admin` and `User` roles.
- **Documentation**: Automated API documentation generation using `generateDocs.js`.

### ⚛️ Frontend (React & TypeScript)

A high-performance SPA built with Vite and modern React hooks.

- **State Management**: React Context API for authentication and global user state.
- **Routing**: Client-side routing with `react-router-dom` (v7).
- **UI/UX**: Responsive design with `react-toastify` for notifications and `react-icons` for a polished look.
- **Type Safety**: 100% TypeScript coverage with a centralized type system.

---

## 📂 Project Structure

```text
event-management-app/
├── client/                     # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/         # Modular UI components (Admin, Events, Auth, etc.)
│   │   ├── context/            # React Context (AuthContext)
│   │   ├── types.ts            # Centralized TypeScript definitions
│   │   ├── App.tsx             # Main routing and layout
│   │   └── main.tsx            # Application entry point
├── server/                     # Node.js + Express + MongoDB
│   ├── config/                 # Database configuration
│   ├── controllers/            # Business logic handlers
│   ├── middleware/             # Auth guards and rate limiters
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API endpoint definitions
│   ├── seed.js                 # Database seeding script (Faker.js)
│   ├── generateDocs.js         # API documentation generator
│   └── index.js                # Server entry point
```

---

## 🚀 Key Features

### 👤 For Participants (Users)

- **Event Discovery**: Real-time search and filter capabilities.
- **Seamless Registration**: Atomic booking logic with real-time capacity updates.
- **Profile & History**: View registered events and manage attendance history.
- **Secure Access**: JWT-protected routes and persistent login state.

### 🔑 For Organizers (Admins)

- **Analytics Dashboard**: Real-time stats for total revenue and user registrations.
- **Event Management**: Full CRUD operations for creating and updating events.
- **Data Integrity**: Automated seeding for testing scenarios using `npm run seed`.
- **System Monitoring**: Access to automated API specifications at `server/API_SPEC.md`.

---

## 🛠️ Installation & Setup

### 1. Prerequisites

- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance.

### 2. Clone the Repository

```bash
git clone https://github.com/AnilPullagura/eventmanager.git
cd event-management-app
```

### 3. Server Setup

```bash
cd server
npm install
# Create .env file with: PORT, MONGO_URI, JWT_SECRET
npm run seed  # Optional: Seed the database with sample data
npm run dev   # Start development server
```

### 4. Client Setup

```bash
cd ../client
npm install
npm run dev   # Start Vite development server
```

---

## 📜 Development Scripts

- `npm run dev`: Starts the development environment (Backend/Frontend respectively).
- `npm run seed`: (Server) Populates MongoDB with mock events and users using Faker.js.
- `node generateDocs.js`: (Server) Re-generates `API_SPEC.md` based on current routes.

---

## 🤝 Contact & Support

Designed & Developed by **Anil Pullagura**.
Feel free to open an issue or pull request!
