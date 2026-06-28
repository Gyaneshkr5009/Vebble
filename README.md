# 🚀 Vebble

<p align="center">
  <strong>A modern real-time social media platform built with the MERN Stack.</strong>
</p>

<p align="center">
Connect, chat, share, and engage with users through real-time messaging, secure authentication, and dynamic media sharing.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black?logo=socket.io)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

# 📖 Overview

Vebble is a **full-stack social media platform** that combines real-time communication with modern web technologies to deliver a seamless social networking experience.

Users can create accounts, upload media, connect with others, and exchange instant messages through WebSockets.

The project focuses on scalable backend architecture, secure authentication, and responsive frontend design.

---

# ✨ Features

- 🔐 Secure JWT Authentication
- 👤 User Profiles
- 💬 Real-Time Messaging (Socket.io)
- 📷 Image Uploads via Cloudinary
- ❤️ Like & Comment System
- 📝 Create & Manage Posts
- 🔍 User Search
- ⚡ Responsive UI
- 🌍 REST API Architecture
- 🗂 Global State Management using Zustand

---

# 🛠 Tech Stack

## Frontend

- React
- Zustand
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Socket.io

## Database

- MongoDB

## Services

- Cloudinary
- JWT Authentication

---

# 🏗 Architecture

```
                React Client

                     │

                     ▼

             Express REST APIs

                     │

       ┌─────────────┴─────────────┐

       ▼                           ▼

Authentication             Socket.io Server

       │                           │

       ▼                           ▼

 JWT Verification          Real-time Messaging

       │                           │

       └─────────────┬─────────────┘

                     ▼

                 MongoDB

                     │

                     ▼

                Cloudinary
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Gyaneshkr5009/Vebble.git
```

---

## Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file.

Example:

```env
MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm run dev
```

---

# 📁 Project Structure

```
Vebble
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── store/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── sockets/
│   └── utils/
│
└── README.md
```

---

# 🔥 Core Functionalities

✅ User Authentication

✅ Create Posts

✅ Upload Images

✅ Like & Comment

✅ Real-Time Chat

✅ User Profiles

✅ Responsive Design

---

# Future Improvements

- 📹 Video Upload Support
- 🔔 Push Notifications
- 📞 Audio & Video Calling
- 👥 Groups & Communities
- 🌙 Dark Mode
- 📱 Progressive Web App
- 🤖 AI-powered Feed Recommendations

---

# 📸 Screenshots

> Add screenshots here

Example

```
Home Feed

Profile

Chat

Login

Explore
```

---

# Demo

Add your deployment link here.

Example

```
https://your-live-demo.vercel.app
```

---

# Author

**Gyanesh Kumar**

🌐 Portfolio

https://portfolio-v3-two-virid.vercel.app/

🐙 GitHub

https://github.com/Gyaneshkr5009

💼 LinkedIn

https://www.linkedin.com/in/gyanesh-kumar-a73114213/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
