const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: 'qwerty',  
  database: 'joga_mysql'  
});

connection.connect((err) => {
  if (err) {
      console.error('Database connection failed:', err.stack);
      return;
  }
  console.log('Connected to the database.');
});


module.exports = connection; 
