// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'YouTube',
  password : 'root',
  timezone : 'Asia/Seoul',
  dateStrings : true
});

module.exports = connection

