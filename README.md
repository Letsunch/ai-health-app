# 🧠 AI Health App

A full-stack health monitoring app built with **React + Firebase**, designed for the **AI for Health Hackathon**. This app provides real-time alerting, diagnostics tracking, and profile management — with full CRUD support and secure authentication.

---

## 🚀 Tech Stack

* ⚛️ Frontend: React + React Router + Context API
* 🔥 Backend: Firebase (Auth, Firestore, Analytics)
* 🛠 Build Tool: Vite
* 🧪 Testing: Vitest / React Testing Library

---

## 📂 Project Structure

```
src/
├── auth/               # AuthProvider & PrivateRoute
├── components/         # Navbar, AlertCard, etc.
├── pages/              # Login, Register, Profile, Alerts, Tests
├── services/           # Firestore access logic
├── firebase/           # Firebase config
├── scripts/            # Dev-only seeders
└── App.jsx             # Main router config
```

---

## 🔐 Features

✅ User authentication (login/register/logout)
✅ Protected routes (alerts, diagnostics, profile)
✅ Firebase Firestore connection
✅ Alert dashboard (with timestamps, badges, and filters)
✅ Diagnostic test CRUD interface
✅ User profile page with preference settings

---

## 🧪 Running the Test Suite

### 📦 Prerequisites

Install dependencies:

```bash
npm install
```

### 🚀 Run All Tests

```bash
npm test
```

Optional:

```bash
npm run test:coverage   # Runs tests with coverage report
```

### ✅ Test Coverage

* Auth flow
* Firestore CRUD
* Protected routes
* Components (Alerts, Profile, Diagnostics)

---

## 🔧 Dev Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-health-app.git
cd ai-health-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file at the root:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 4. Start the dev server

```bash
npm run dev
```

---

## 🧪 Seed Sample Data (Dev Only)

To auto-populate Firestore with sample alerts:

```js
import seedAlerts from './scripts/seedAlerts';

useEffect(() => {
  seedAlerts();
}, []);
```

Remove this after seeding to prevent duplication!

---

## 📄 License

MIT © 2025 – AI for Health Hackathon Team
