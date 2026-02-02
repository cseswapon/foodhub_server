# 🍱 FoodHub Backend

Backend service for **FoodHub**, the meal ordering platform where customers can browse menus, place orders, providers manage their meals, and admins oversee the system.

This repository contains **only the backend** implementation.

---

## 📌 Overview

The backend provides:

- User authentication and role management
- Meal and provider management
- Order creation and tracking
- Admin moderation and control

Three roles are supported: **Customer, Provider, Admin**.
Admin users are seeded into the database and cannot be registered via the frontend.

---

## 🛠️ Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **Better Auth** for authentication
- **Vercel** deployment

---

## 👤 Test Credentials

You can log in directly using these accounts:

### Customer

```
Email: customer@gmail.com
Password: customer@gmail.com
```

### Admin

```
Email: admin@gmail.com
Password: 123456789
```

> Any user who wants to log in can use their email and password. Registration for providers and customers is available on the frontend.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/cseswapon/foodhub_server
cd foodhub_server
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/foodhub
PORT=5000
```

### 4️⃣ Prisma Setup

Generate the Prisma client:

```bash
npm run generate
```

Run migrations:

```bash
npm run migrate
```

### 5️⃣ Seed Admin User

```bash
npm run seeding:admin
```

### 6️⃣ Start Development Server

```bash
npm run dev
```

The backend server will run at:

```
http://localhost:5000
```

---

## 🌐 Deployment

- **Client:** [https://foodhub-client-eight.vercel.app](https://foodhub-client-eight.vercel.app)
- **Server:** [https://foodhub-server-smoky.vercel.app](https://foodhub-server-smoky.vercel.app)

---

## 📂 Project Structure

```
src/
├── server.ts
├── routes/
├── controllers/
├── middlewares/
├── services/
├── scripts/
│   └── adminSeeding.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── utils/
```

---

## 📜 Scripts

| Command                 | Description            |
| ----------------------- | ---------------------- |
| `npm run dev`           | Start dev server       |
| `npm run build`         | Build project          |
| `npm run start`         | Start production       |
| `npm run migrate`       | Prisma migration       |
| `npm run generate`      | Generate Prisma client |
| `npm run studio`        | Open Prisma Studio     |
| `npm run seeding:admin` | Seed admin user        |
| `npm run vercel:deploy` | Deploy to Vercel       |

---

## ✍️ Author

**Swapon Saha**
GitHub: [https://github.com/cseswapon](https://github.com/cseswapon)
