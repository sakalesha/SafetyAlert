# 🚨 SafetyAlert – Community Safety Reporting Platform

**SafetyAlert** is a full-stack web platform that empowers residents to report safety incidents in real-time using photos, videos, and descriptions. It provides a clean user interface for submitting alerts and a secure backend to manage and store them. This project is built using the **MERN Stack** (MongoDB, Express, React, Node.js) and is designed to scale with upcoming features like AI-powered severity prediction, admin verification, and real-time notification systems. [web:1]

## ⭐ Highlights
- 🧑‍💻 **Full-stack MERN Application**
- 📸 **Upload photos & videos** (Multer)
- 🔐 **Secure JWT authentication**
- 🗂 **Personal "My Alerts" dashboard**
- 🗺 **Interactive Map** with Leaflet
- ⚡ **Clean API architecture**
- 📦 **Ready for future AI integrations**
- 🎓 **Student-friendly, real-world project**

## 🎯 Why SafetyAlert?
Many safety incidents go unnoticed because:
- There is no centralized, trusted reporting tool
- People hesitate without visual evidence
- Communication is slow and scattered

**SafetyAlert solves this by providing:**
- ✔ **Fast incident reporting**
- ✔ **Proof-based alerts** (images/videos)
- ✔ **Public visibility** for awareness
- ✔ **A scalable backend** for processing alerts

## 🚀 Features

### 👥 User Features
- Register/login securely
- Create incidents with media
- View all personal alerts
- Delete their alerts
- Interactive map to view alert locations

### 🛠 System Features
- Multer-based media upload
- Secure JWT authentication
- MongoDB-backed storage
- Modular controller-based backend
- REST API architecture

### 🔮 Coming Soon
- Admin dashboard
- AI category & severity classifier
- Search & filters
- Push notifications
- Real-time public feed

## 🧱 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Leaflet.js
- TailwindCSS (planned)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer
- JWT + bcrypt
- dotenv

### Dev Tools
- GitHub
- Postman
- MongoDB Atlas
- VS Code

## 📁 Project Structure
```
SafetyAlert/
│── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── uploads/ # media files stored here
│ ├── server.js
│ └── package.json
│
│── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/sakalesha/SafetyAlert.git
cd SafetyAlert
```

### 🔧 Backend Setup
**Install dependencies:**
```
cd backend
npm install
```

**Create `.env`:**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Start server:**
```
npm run dev
```
**Backend runs on:** http://localhost:5000

### 🎨 Frontend Setup
**Install dependencies:**
```
cd frontend
npm install
```

**Create `.env`:**
```
REACT_APP_API_URL=http://localhost:5000/api
```


**Start frontend:**
```
npm start
```
**Frontend runs on:** http://localhost:3000

## 📡 API Overview

**Base URL:** `http://localhost:5000/api`

### Authentication
| Method | Endpoint    | Description       |
|--------|-------------|-------------------|
| POST   | `/auth/register` | Create new user |
| POST   | `/auth/login`    | Login user       |
| GET    | `/auth/me`       | Get logged-in user |

### Alerts
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/alerts`      | Create new alert (with media) |
| GET    | `/alerts/mine` | Get alerts posted by the user |
| GET    | `/alerts/:id`  | Get alert details        |
| DELETE | `/alerts/:id`  | Delete an alert          |

## 🧬 Database Models

### User Schema
```
{
"name": "String",
"email": "String",
"password": "String",
"role": "String",
"createdAt": "Date",
"updatedAt": "Date"
}
```

### Alert Schema
```
{
"title": "String",
"description": "String",
"mediaUrl": "String",
"location": "String",
"userId": "ObjectId",
"aiCategory": "String",
"aiSeverity": "String",
"aiConfidence": "Number",
"createdAt": "Date"
}
```


## 🌍 Deployment Guide

**Frontend (Vercel)**
- Connect GitHub repo
- Add environment variables
- Deploy

**Backend (Render)**
- Create Web Service
- Add .env
- Deploy

**Database (MongoDB Atlas)**
- Create cluster
- Add IP whitelist
- Get connection string

## 🤝 Contributing
1. Fork this repo
2. Create new branch (`feature/my-feature`)
3. Commit changes
4. Push branch
5. Create Pull Request

**All contributions are welcome!**

## 📜 License
This project is open-source and available under the **MIT License**.

## 📞 Contact
**Author:** Ronada Sakalesha  
**📧 Email:** ronadasakalesha@gmail.com  
**🐙 GitHub:** [https://github.com/sakalesha](https://github.com/sakalesha)

---

⭐ **If you like this project, consider giving it a star!** [web:5]
