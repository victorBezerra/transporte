const express = require('express');
const mysql = require('mysql');
const cadastrar = require("./cadastrar");
const listar = require("./listar");
const alterar = require("./alterar");
const deletar = require ("./deletar");

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.get('/cadastrar');
app.use('/', cadastrar);

app.use('/', listar);
app.get('/listar');

app.get('/alterar');
app.use('/', alterar);

app.get('/deletar');
app.use('/', deletar);


module.exports = app;
