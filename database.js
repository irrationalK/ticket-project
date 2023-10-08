const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE
}).promise();

async function getUsers() {
   try {
      const [results] = await pool.query('SELECT * FROM users');
      console.log(results);
   } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer:', error);
   }
}

getUsers();
