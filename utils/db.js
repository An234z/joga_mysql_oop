const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: 'qwerty',  
  database: 'joga_mysql'  
});

module.exports = connection; 
