---
# **Real-Time Comments System**
A **real-time comments application** built using **Next.js, Node.js, Socket.IO, and MySQL**, with a responsive and clean UI styled using **Material UI (MUI)**.
---

## **Project Overview**

This application allows users to log in with a username, post comments, and see new comments in real time using **Socket.IO**. The backend uses **Express and MySQL** to store and manage comments, while the frontend is built with **Next.js** for fast performance and responsive design.

---

## **Features**

- Real-time updates for comments using **Socket.IO**.
- Responsive and modern UI using **Material UI**.
- Persistent comment storage using **MySQL**.
- User-friendly interface with dynamic avatars and clean layouts.

---

## **Screenshots**

### **Login Page**

![Login Screenshot](https://via.placeholder.com/600x300.png?text=Login+Page)

### **Comment Section**

![Comment Section Screenshot](https://via.placeholder.com/600x300.png?text=Comments+Section)

---

## **Technologies Used**

- **Frontend**: Next.js, React, Material UI
- **Backend**: Express, Node.js, Socket.IO
- **Database**: MySQL
- **Others**: Axios for HTTP requests, TypeScript for type safety

---

## **Getting Started**

### **1. Clone the repository**

```bash
git clone https://github.com/khadka27/real-time-comments-system.git
cd real-time-comments-system
```

### **2. Setup Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and provide your database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=comments_db
```

### **3. Setup Database**

```bash
node db/setupDatabase.js
```

This will automatically create the database and the `comments` table.

### **4. Start Backend**

```bash
node server.js
```

The backend will run at `http://localhost:3001`.

---

### **5. Setup Frontend**

```bash
cd frontend
npm install
```

### **6. Start Frontend**

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## **Project Structure**

```
real-time-comments-system
│
├── backend
│   ├── .env                  # Environment variables
│   ├── db                    # Database setup scripts
│   ├── server.js             # Main server logic
│   └── package.json          # Backend dependencies
│
├── frontend
│   ├── src
│   │   ├── app               # App Router (Next.js)
│   │   ├── components        # Reusable UI components
│   │   └── types             # TypeScript interfaces
│   ├── package.json          # Frontend dependencies
│   └── tsconfig.json         # TypeScript configuration
│
└── README.md                 # Documentation
```

---

## **How It Works**

1. **Login**: Users log in using a simple username (no passwords required).
2. **Post Comment**: Users can write and post comments using the provided form.
3. **Real-Time Updates**: New comments are broadcasted to all connected users in real time using **Socket.IO**.
4. **Persistent Storage**: Comments are saved in a **MySQL database** and fetched when the page loads.

---

## **API Endpoints**

### **Backend (Express)**

- **GET /api/comments**  
  Fetches all comments from the database.
- **POST /api/comments**  
  Adds a new comment to the database and broadcasts it using **Socket.IO**.

---

## **Screenshots**

Include images of the app in action.

---

## **Contributing**

Feel free to open a **pull request** or **issue** if you would like to contribute or report bugs.

---

## **Author**

**Abishek Khadka**  
[GitHub](https://github.com/khadka27)  
**Email**: abishekkhadka90@gmail.com

---

## **License**

This project is licensed under the **MIT License**.

---
