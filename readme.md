# 🔐 Auth User API (TypeScript)

A secure RESTful API built with **Node.js**, **Express**, and **TypeScript**, featuring:

- ✅ JWT Authentication & Role-Based Access Control (RBAC)
- 👤 User CRUD (Admin only)
- 📦 Zod for input validation
- 🔐 Password hashing with Bcrypt
- ⚙️ Environment-based configuration
- 🧼 Clean & modular architecture

---

## 📁 Folder Structure (Overview)

```
src/
├── app.ts                 # Express app setup
├── bootstrap.ts           # Bootstrap function to initialize the app
├── server.ts              # Entry point of the application

├── config/
│   └── config.ts          # Application config

├── database/
│   ├── connection.ts      # MongoDB connection setup
│   └── models/
│       ├── user.model.ts
│       └── items.model.ts

├── middlewares/           # All middlewares (auth, error handling, etc.)

├── utils/                 # Utility functions (e.g., slugify, token helpers)

├── types/                 # Global and custom TS types

├── modules/
│   ├── mounts.modules.ts  # Mount all modules into app
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.services.ts
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   ├── user.schema.ts
│   │   └── user.services.ts
│   ├── item/
│   │   ├── item.controller.ts
│   │   ├── item.routes.ts
│   │   ├── item.schema.ts
│   │   └── item.services.ts
│   └── user-admin/
│       ├── user-admin.controller.ts
│       ├── user-admin.routes.ts
│       ├── user-admin.schema.ts
│       └── user-admin.services.ts

```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or remote)

---

## ✨ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HassanEssam0110/Auth-Api-TS.git
cd auth-user-api-ts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and paste this content:

```env
# SERVER
PORT=5000

# DATABASE
DB_URI="mongodb://127.0.0.1:27017/DB_CRUDS"

# BCRYPT
SALT_ROUNDS=10

# JWT
JWT_SECRET="Secret@PP_JWT18945ghelLKsvdTESt#okw$fdg"
JWT_EXPIRES_IN="30d"
JWT_CUSTOM_PREFIX="Bearer"
```

---

## 💻 Running the App

### 🔧 Development Mode

```bash
npm run dev
```

> Starts the server with `nodemon` and TypeScript support.

### 🚀 Production Build

```bash
npm run build    # Transpile TypeScript
npm start        # Run built JavaScript
```

---

## 📬 API Endpoints (Brief)

### 🔐 Auth

| Method | Route                 | Access | Description                 |
| ------ | --------------------- | ------ | --------------------------- |
| POST   | `/api/v1/auth/login`  | Public | Login with email & password |
| POST   | `/api/v1/auth/signup` | Public | Register a new user         |

### 👤 Users

| Method | Route                       | Access              | Description                    |
| ------ | --------------------------- | ------------------- | ------------------------------ |
| GET    | `/api/v1/users/me`          | Auth (User - Admin) | Get current user's profile     |
| PATCH  | `/api/v1/users/me`          | Auth (User - Admin) | Update current user's data     |
| PATCH  | `/api/v1/users/me/password` | Auth (User - Admin) | Update current user's Password |
| DELETE | `/api/v1/users/me`          | User Only           | Soft Delete user               |

### 👮 Admin Users

| Method | Route               | Access     | Description           |
| ------ | ------------------- | ---------- | --------------------- |
| POST   | `/api/v1/users/`    | Admin Only | Create a new user     |
| GET    | `/api/v1/users/`    | Admin Only | Get all users         |
| GET    | `/api/v1/users/:id` | Admin Only | Get single user by ID |
| PUT    | `/api/v1/users/:id` | Admin Only | Update user by ID     |
| DELETE | `/api/v1/users/:id` | Admin Only | Delete user by ID     |

### 📦 Items

| Method | Route               | Access     | Description       |
| ------ | ------------------- | ---------- | ----------------- |
| POST   | `/api/v1/items/`    | Admin Only | Create a new item |
| GET    | `/api/v1/items/`    | Public     | Get all items     |
| GET    | `/api/v1/items/:id` | Public     | Get item by ID    |
| PUT    | `/api/v1/items/:id` | Admin Only | Update item by ID |
| DELETE | `/api/v1/items/:id` | Admin Only | Delete item by ID |

---

## 🛡️ Security Features

- Password hashing using **bcrypt**
- JWT token handling with expiration & custom prefix
- **RBAC** to allow only specific roles (user/admin)
- Token invalidation if password changed after issuance
