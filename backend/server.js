require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Connect to MySQL and ensure the comments table exists
let connection;
(async function connectDatabaseAndEnsureTable() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to MySQL.');

    // Create the comments table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createTableQuery);
    console.log('✅ Comments table created or already exists.');
  } catch (err) {
    console.error('❌ Error setting up the database:', err.message);
    process.exit(1);
  }
})();

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('✅ A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Fetch comments
app.get('/api/comments', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM comments ORDER BY timestamp DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post comment and broadcast it
app.post('/api/comments', async (req, res) => {
  const { username, comment } = req.body;

  if (!username || !comment) {
    return res.status(400).json({ error: 'Username and comment are required.' });
  }

  try {
    const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
    const [result] = await connection.query(query, [username, comment]);

    const newComment = {
      id: result.insertId,
      username,
      comment,
      timestamp: new Date(),
    };

    // Broadcast to all connected clients
    io.emit('newComment', newComment);
    res.status(201).json(newComment);
  } catch (err) {
    console.error('❌ Error inserting comment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
