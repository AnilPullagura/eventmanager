# 🎫 Event Pro — Enterprise-Grade Event Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

**Evently** is a robust, full-stack event management ecosystem designed for high performance and scalability. This project recently underwent a major architectural evolution, migrating from a standard JavaScript MERN stack to a **Strictly Typed TypeScript Architecture** for enhanced maintainability and developer productivity.

> **Live API**: [https://eventmanager-api.onrender.com](https://eventmanager-api.onrender.com)

---

## 🏛️ System Architecture

### 🛡️ Backend (Node.js & Express)

A secure, RESTful API layer built with a modular controller-route-model architecture.

- **Database**: MongoDB (Atlas) for non-relational, flexible data storage.
- **Authentication**: Stateless JWT implementation with automatic session termination.
- **Security**:
  - **Bcrypt**: Industrial-grade password hashing.
  - **Rate Limiting**: Integrated protection against brute-force attacks on sensitive endpoints.
  - **Role-Based Access Control (RBAC)**: Distinct permissions for `Admin` and `User` roles.

### ⚛️ Frontend (React & TypeScript)

A modern, high-performance UI built with Vite and strictly typed components.

- **Migration Journey**: Successfully refactored from `.jsx` to `.tsx`, implementing a project-wide type safety layer.
- **State Management**: React Context API utilized for global user state and authentication tracking.
- **Performance**: Debounced search mechanisms and optimized re-renders using modern React hooks.

---

## 📘 The TypeScript Documentary

The most significant upgrade to this platform is the transition to a **Centralized Type System**. This migration eliminated "any" types and replaced runtime guesswork with compile-time certainty.

### 🎯 Centralized Type Library (`src/types.ts`)

Instead of fragmented interfaces, the project uses a single source of truth for all domain models:

- **Unified Domain Models**: `Event`, `User`, and `Stats` are strictly defined and shared across all components.
- **API Response Wrappers**: Standardized wrappers like `EventsResponse` and `LoginResponse` ensure that frontend extraction logic never assumes the data shape—it _knows_ it.
- **UI State Safety**: `ApiStatus` (Initial, Loading, Success, Failure) is exported as a unified type, ensuring consistent loading states across Admin, Home, and History pages.

```typescript
// Example of the centralized architecture
export interface Event {
  _id: string;
  name: string;
  organizer: string;
  // ... strictly typed properties
}

export interface LoginResponse {
  user: User;
  token?: string;
}
```

---

## ✨ Features Pin-to-Pin

### 👤 For the User

- **Dynamic Discovery**: Real-time search engine for finding events by name, location, or tag.
- **Seat Orchestration**: Atomic registration logic—users can't book full events, and cancellations immediately restore capacity.
- **Registration Vault**: Personal history tab to view all past and upcoming event participations.

### 🔑 For the Admin

- **Control Center**: Advanced dashboard for monitoring total revenue, user engagement, and platform growth.
- **Event Lifecycle**: Full CRUD capabilities—instantly create, modify, or delete events across the entire ecosystem.
- **Analytics Engine**: Real-time aggregation of attendance and revenue data via MongoDB `$group` and `$sum` operators.

---

## 📂 Project Blueprint

```text
event-management-app/
├── client/                     # TypeScript Frontend
│   ├── src/
│   │   ├── types.ts            # ⬅️ Centralized Type System
│   │   ├── components/         # Atomic TSX Components
│   │   ├── context/            # Typed Global Registry
│   │   └── App.tsx             # Root Orchestrator
├── server/                     # Node.js Backend
│   ├── controllers/            # Business Logic
│   ├── middleware/             # Security & Auth Guards
│   ├── models/                 # Database Schemas
│   └── routes/                 # API Endpoint Definitions
```

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js ≥ 18
- MongoDB Connection String

### 1. Clone & Install

```bash
git clone https://github.com/AnilPullagura/eventmanager.git
npm run install-all # Custom script to install client & server
```

### 2. Environment Configuration

Create a `.env` in the `server` folder:

```text
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secure_secret
```

### 3. Run Development

```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

---

## 📜 Development Milestone

- [x] **Phase 1**: Initial MERN Implementation
- [x] **Phase 2**: JWT Security & Rate Limiting Integration
- [x] **Phase 3**: Full TypeScript Migration (Strict Mode)
- [x] **Phase 4**: Centralized Response & State Typing
- [ ] **Phase 5**: Unit Testing with Jest & RTL (Upcoming)

---

## 🤝 Contact & Support

Developed with ❤️ by **Anil Pullagura**.
Feel free to reach out for collaboration or questions regarding the architecture!
