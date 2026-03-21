# 🚀 Algorithm Visualizer (Full Stack)

A full-stack web application that visualizes sorting algorithms in real-time with an interactive UI and secure JWT-based authentication.

---

## 🧠 Overview

This project demonstrates how sorting algorithms work through animated visualizations.  
It also integrates a backend with authentication, making it a complete full-stack application.

---

## ✨ Features

- 🔐 User Authentication (JWT-based login)
- 📊 Real-time sorting visualization
- ⚡ Adjustable speed control
- 🎯 Interactive UI with dynamic updates
- 🔄 Supported Algorithms:
  - Bubble Sort
  - Selection Sort
- 🧹 Reset & regenerate arrays
- 👤 Logged-in user display

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS
- Axios

### 🔹 Backend
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- JPA / Hibernate

### 🔹 Database
- MySQL

---

## 📸 Screenshots

> Adding soon

---

## ⚙️ Architecture

```text
Frontend (React)
       ↓
Axios API Calls
       ↓
Spring Boot Backend
       ↓
JWT Authentication (Security Filter)
       ↓
MySQL Database    

git clone https://github.com/PrajwalPai21/algorithm-visualizer
cd algorithm-visualizer

cd AlgoVis-backend
./mvnw spring-boot:run

cd AlgoVis-frontend
npm install
npm run dev

