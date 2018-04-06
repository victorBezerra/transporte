const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const connection = mysql.createConnection({
    'host': '127.0.0.1',
    'user': 'root',
    'password': '190293',
    'database': 'transporte'
  });

const app = express();



module.exports = app;
