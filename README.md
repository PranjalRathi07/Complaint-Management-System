📌 Complaint Management System
https://complaint-management-system-u988.vercel.app/

A full-stack web application to manage and resolve complaints efficiently with role-based access.

🚀 Overview

The Complaint Management System is designed to streamline complaint handling between users and administrators.
It provides a structured workflow where users can submit issues and admins can track, manage, and resolve them.

✨ Features
👤 User Side
📝 Submit complaints
📊 Track complaint status
🕒 View complaint history
🛠️ Admin Side
📋 View all complaints
🔄 Update complaint status (Pending / In Progress / Resolved)
🗑️ Delete or manage complaints

⚙️ Tech Stack

Frontend

React.js
Tailwind CSS

Backend

Node.js
Express.js

Database

MongoDB

Authentication

JWT (JSON Web Token)

📁 Project Structure
Complaint-Management-System/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node + Express)
├── models/        # Mongoose models
├── routes/        # API routes
├── controllers/   # Logic handling
└── config/        # DB & environment configs

🔐 Authentication Flow
User registers / logs in
JWT token is generated
Protected routes are accessed using token

🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/PranjalRathi07/Complaint-Management-System.git
cd Complaint-Management-System
2️⃣ Install dependencies
Backend
cd server
npm install
Frontend
cd client
npm install
3️⃣ Environment Variables

Create a .env file in server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the project
Start Backend
cd server
npm start
Start Frontend
cd client
npm run dev

🌐 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/complaints	Create complaint
GET	/api/complaints	Get all complaints
PUT	/api/complaints/:id	Update status
DELETE	/api/complaints/:id	Delete complaint


🚀 Deployment
Frontend → Vercel / Netlify
Backend → Render / Railway
Database → MongoDB Atlas
