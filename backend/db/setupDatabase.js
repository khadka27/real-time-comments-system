require('dotenv').config();
const mysql = require('mysql2/promise');

(async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log('✅ Connected to MySQL.');

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('✅ Database created or already exists.');

    // Switch to the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create the comments table
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

    await connection.end();
    console.log('✅ MySQL setup completed successfully.');
  } catch (err) {
    console.error('❌ Error setting up the database:', err.message);
    process.exit(1);
  }
})();
