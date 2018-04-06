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

app.get('/apagarVeiculo/:id', function(req, res){
  const id  = req.params.id;
  connection.query('DELETE FROM veiculo,modelos,combustivel,status,propriedade,cor '+
    'USING veiculo '+
    'INNER JOIN modelos '+
    'INNER JOIN combustivel '+
    'INNER JOIN status '+
    'INNER JOIN cor '+
    'INNER JOIN propriedade '+
    'WHERE '+
    'veiculo.id=modelos.id  '+
    'AND veiculo.id=combustivel.id  '+
    'AND veiculo.id=status.id '+
    'AND veiculo.id=propriedade.id '+
    'AND veiculo.id=cor.id '+
    'AND veiculo.id=?; '+
    'DELETE FROM modelos, genero, tipo, marca, carroceria, especie '+
    'USING modelos '+
    'INNER JOIN genero '+
    'INNER JOIN tipo '+
    'INNER JOIN marca '+
    'INNER JOIN carroceria '+
    'INNER JOIN especie '+
    'WHERE '+
    'modelos.id = genero.id '+
    'AND modelos.id=tipo.id '+
    'AND modelos.id=carroceria.id '+
    'AND modelos.id=especie.id '+
    'AND modelos.id=?',[id,id],function(err,result){
    if(err)
      throw err;
    else
      res.redirect('/');
  });
});

app.get('/apagarMotorista/:nome', function(req,res){
  const nome = req.params.nome;
  console.log("NOME:"+nome);
  connection.query('DELETE FROM motoristas WHERE nome = ?',[nome],function(err,result){
    if(err){
      throw err;
      console.log(err);
    }
    else
      res.redirect('/');
  });
});

module.exports = app;
