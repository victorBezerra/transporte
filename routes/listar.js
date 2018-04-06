const express = require('express');
const mysql = require('mysql');


const connection = mysql.createConnection({
    'host': '127.0.0.1',
    'user': 'root',
    'password': '190293',
    'database': 'transporte'
  });

/* GET users listing. */
var app = express();

app.get('/listarVeiculos', function(req, res){
  connection.query('SELECT marca.descricao AS "marca_descricao", tipo.descricao AS "tipo_descricao",'+
  ' carroceria.descricao AS "carroceria_descricao", especie.descricao AS "especie_descricao", especie.ativo AS "especie_ativo", '+
  'genero.descricao AS "genero_descricao",modelos.descricao AS "modelo_descricao", modelos.ativo AS "modelo_ativo"'+
  ', combustivel.descricao AS "combustivel_descricao", status.descricao AS "status_descricao",'+
  ' propriedade.descricao AS "propriedade_descricao", cor.descricao AS "cor_descricao",'+
  'veiculo.id, veiculo.placa, veiculo.descricao, veiculo.qtd_max_pass, veiculo.ano_modelo, veiculo.ano_fabricacao from veiculo '+
  'inner join marca on marca.id=veiculo.id '+
  'inner join tipo on tipo.id=veiculo.id '+
  'inner join carroceria on carroceria.id=veiculo.id '+
  'inner  join especie on especie.id=veiculo.id '+
  'inner join genero on genero.id=veiculo.id '+
  'inner join modelos on modelos.id=veiculo.id '+
  'inner join combustivel on combustivel.id=veiculo.id '+
  'inner join status on status.id=veiculo.id '+
  'inner join propriedade on propriedade.id=veiculo.id '+
  'inner join cor on cor.id=veiculo.id', function(err, result){
    if(err)
      throw err;
    else{
      const veiculo = {print: result};
      res.render('listaVeiculos', veiculo);
      ;}
  });
});

app.get('/listarMotoristas', function(req, res){
  connection.query('SELECT * FROM motoristas', function(err, result){
    if(err)
      throw err;
    else{
      const motorista = {print: result};
      res.render('listaMotorista', motorista);
    }
  });
});

module.exports = app;
