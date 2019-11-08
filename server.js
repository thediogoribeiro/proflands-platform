const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});

app.use('/static', express.static('public'));
//app.use(express.json({limit:'1mb'}));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/index.html'));
});

var nJg=0;
var objSol;
var score1=0;
var score2=0;

app.post('/waiting',(req, res) => {
    if(nJg===2) res.send({status:"OK"});
    else res.send({status:"NO"});
});

app.post('/1v1score',(req, res) => {
    console.log(req.body.player);
    if(req.body.player=="Jogador 1") score1=req.body.score;
    else score2=req.body.score;
    res.send({ status: 'score save: SUCCESS',score: req.body.score });
});

app.post('/checkScore',(req, res) => {
    if(score1>score2) res.send({ status: 'Jogador 1 ganhou!!' });
    else if(score1<score2) res.send({ status: 'Jogador 2 ganhou!!' });
    else if(score1==score2) res.send({ status: 'Empate' });
    else res.send({ status: 'ERROR' });
});

app.post('/lobby',(req, res) => {
  nJg++;
  if(nJg===1){
    res.send({ player: '1' });
  }else{
    res.send({ player: '2' });
    nJg=0;
  }
});

app.post('/after_lobby',(req, res) => {
  if(nJg===1){
    objSol=req.body;
    res.send({ status: 'SUCCESS' });
  }else{
    res.send(objSol);
  }
});
