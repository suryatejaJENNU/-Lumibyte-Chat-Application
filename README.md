# 🚀 LumiByte Chat Application

A fully responsive, modern AI-style chat interface built with **React (Frontend)** and **Node.js + Express (Backend)**.  
It supports chat sessions, message history, auto-generated responses using mock logic, and feedback (like/dislike) with clean icons.

No environment variables required.  
No database — backend uses lightweight in-memory mock data.

---

## 🌐 Live Demo

### 🔹 **Frontend (Netlify)**
👉 https://suryateja-lumibyte-chat-application.netlify.app

### 🔹 **Backend API (Render)**
👉 https://lumibyte-chat-application-backend.onrender.com/api

### 🎥 **Demo Video**
👉 https://drive.google.com/file/d/14_N6xDS_glUTtRb_h9wA8PLCv61J8LSi/view?usp=sharing

---

## 📁 Project Structure

LumiByte-Chat-Application/
│
├── backend/
│ ├── mockData.js
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
├── public/
└── package.json


---

## ✨ Features

### 🟦 **Frontend (React + Tailwind)**

- Beautiful, clean chat UI  
- Fully responsive — behaves similar to **ChatGPT layout**
- Sidebar listing all chat sessions
- Create / Open / Rename / Delete sessions
- Message sending with auto-scroll
- Like / Dislike buttons using Lucide React icons
- Smooth UI interactions
- Dark / Light theme support
- Fetch API for backend communication

---

### 🟨 **Backend (Node.js + Express)**

- Session creation, rename, delete
- Chat history storage (in-memory)
- Mock AI-like responses:
  - Marketing insights  
  - Sales insights  
  - General conversation
- Feedback API (like/dislike)
- No database or environment variables needed

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Lucide React Icons  
- Fetch API  

### **Backend**
- Node.js  
- Express.js  
- CORS  

---

## 🚀 Getting Started

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/LumiByte-Chat-Application.git
cd LumiByte-Chat-Application
🟦 Frontend Setup

cd frontend
npm install
npm start
Frontend runs at:

👉 http://localhost:3000

🟨 Backend Setup

cd backend
npm install
node server.js
Backend runs at:

👉 http://localhost:5000/api

📘 Backend API Documentation
🔹 Base URLs
Local:


http://localhost:5000/api
Production:



https://lumibyte-chat-application-backend.onrender.com/api
📌 GET /api/sessions
Returns all chat sessions (newest first).

📌 GET /api/new-chat?title=Optional
Creates a new chat session.

📌 GET /api/session/:id
Returns the chat history for a specific session.

📌 POST /api/chat/:id
Send a message and get an auto-generated response.

Request:
json

{
  "message": "Your question"
}
Response includes:
User message

Generated answer

Table data (if applicable)

Description

Timestamps

📌 PUT /api/session/:id
Rename a chat.

Request:
json

{
  "title": "New Title"
}
📌 DELETE /api/session/:id
Delete an entire chat session.

📌 POST /api/feedback/:sessionId/:messageId
Submit Like / Dislike feedback.

Request:
json

{
  "feedback": "like"
}
📦 Detailed Folder Structure
Frontend

frontend/
│── src/
│   ├── components/
│   ├── App.jsx
│   └── index.js
│── public/
│── package.json
│── tailwind.config.js
Backend

backend/
│── server.js
│── mockData.js
│── package.json
🤝 Contributing
If you’d like to improve this project, feel free to submit an issue or open a pull request!

⭐ Show Your Support
If this project helped you, please ⭐ the repository!



