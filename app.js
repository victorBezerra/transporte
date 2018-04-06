/**
* Arquivo: app.js
*Descrição:
*Autor: Victor Bezerra victorbezerr@hotmail.com
*Data: 13/03/2017
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./views');
app.get('/', function(req, res){
  res.render('index');
});

// ROTAS!!!!!
//***********

var rotas = require('./routes');
app.use('/', rotas);


app.listen(3000, function() {
  console.log("PRONTO!!! acesse localhost:3000");
});
