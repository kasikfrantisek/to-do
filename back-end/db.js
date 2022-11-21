const { builtinModules } = require('module');
require('dotenv').config()
//const mysql = require('mysql');

const mysql = require('mysql2')
const conn = mysql.createConnection(process.env.DATABASE_URL)


  conn.connect((err) => {
    if (err) {
      console.error('Cannot connect to the database', err);
      return;
    }
    console.log('Connection established');
  });

  module.exports = conn;