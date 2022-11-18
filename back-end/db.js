const { builtinModules } = require('module');
let mysql = require('mysql');

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'to_do',
  });

  conn.connect((err) => {
    if (err) {
      console.error('Cannot connect to the database', err);
      return;
    }
    console.log('Connection established');
  });

  module.exports = conn;