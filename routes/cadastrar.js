const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const connection = mysql.createConnection({
    'host': '127.0.0.1',
    'user': 'root',
    'password': '190293',
    'database': 'transporte'
  });

/* GET users listing. */
const app = express();

app.get('/cadastrarMotorista',function(req,res){
  res.render('motoristas');
});

app.post('/cadastrarMotorista', function(req, res){
  const nome  = req.body.nome;
  const descricao = req.body.descricao;
  const cpf = req.body.cpf;
  const inscricao = req.body.inscricao;
  const representante = req.body.representante;
  const endereco = req.body.endereco;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const cep = req.body.cep;
  const email =  req.body.email;
  const site = req.body.site;
  const telefone = req.body.telefone;
  const nit = req.body.nit;
  const tipo  = req.body.tipo;
  console.log();
  connection.query('INSERT INTO motoristas (nome, nomeFantasia, cpf, insEstadual, representante, endereco, bairro, cidade, estado, cep, email, site, telefone, nit, tipo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nome,descricao,cpf,inscricao,representante,endereco,bairro,cidade,estado,cep,email,site,telefone,nit,tipo], function(err,result){
    if(err)
      throw err;
    else
      res.redirect('/');
  });
});

app.get('/cadastrarVeiculo', function(req, res){
  res.render('marcas');
});

app.post('/marca', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO marca (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else
      res.render('carroceria');
    });
  });

app.post('/carroceria', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO carroceria (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else
        res.render('especie');
    });
});

app.post('/especie', function(req, res){
  const descricao = req.body.descricao;
  const ativo = req.body.ativo;
  connection.query('INSERT INTO especie (descricao, ativo) VALUES(?,?)',[descricao, ativo], function(err, result){
    if(err)
      throw err;
    else{
        res.render('tipo');
      }
  });
});

app.post('/tipo', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO tipo (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
        res.render('genero');
      }
  });
});

app.post('/genero', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO genero (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
          res.render('modelos');
        }
    });
});

app.post('/modelos', function(req, res){
  const descricao = req.body.descricao;
  const ativo = req.body.ativo;
connection.query('SELECT * FROM marca ORDER BY id DESC LIMIT 1', function(err,result){
  if(err)
    throw err;
  else{
    const id = result[0];
    connection.query('INSERT INTO modelos (id_marca, id_tipo, id_carroceria, id_genero, id_especie, descricao, ativo)'+
    'VALUES(?,?,?,?,?,?,?)',[id.id, id.id, id.id, id.id, id.id, descricao, ativo], function(err, result){
      if(err)
        throw err;
      else
        res.render('combustivel');
        });
      }
    });
});

app.post('/combustivel', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO combustivel (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
      res.render('cores');
    };
  });
});

app.post('/cores', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO cor (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
      res.render('status');
    };
  });
});

app.post('/status', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO status (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
      res.render('propriedade');
    };
  });
});

app.post('/propriedade', function(req, res){
  const descricao = req.body.descricao;
  connection.query('INSERT INTO propriedade (descricao) VALUES(?)',[descricao], function(err, result){
    if(err)
      throw err;
    else{
      res.render('veiculos');
    };
  });
});

app.post('/veiculos',function(req, res){
  const descricao = req.body.descricao;
  const placa = req.body.placa;
  const ano_modelo = parseInt(req.body.anoModelo);
  const ano_fabricacao = parseInt(req.body.anoFabricacao);
  const qtd_max_pass = parseInt(req.body.maxPassageiros);
  connection.query('SELECT * FROM modelos ORDER BY id DESC LIMIT 1', function(err,result){
    if(err)
      throw err;
    else{
      const id = result[0];
      connection.query('INSERT INTO veiculo (placa, descricao, ano_modelo, ano_fabricacao,qtd_max_pass, id_modelo, id_cor, id_combustivel, id_propriedade, id_status) VALUES (?,?,?,?,?,?,?,?,?,?)',[placa,descricao,ano_modelo,ano_fabricacao,qtd_max_pass,id.id ,id.id,id.id,id.id,id.id], function(err, result){
        if(err)
          throw err;
        else
          res.redirect('/');
        });
      }
    });
});

module.exports = app;
