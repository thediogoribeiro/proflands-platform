const host = '0.0.0.0';
const port = '3000';
const express = require('express');
const path = require('path');
const app = express();

var lobby=0;

app.use('/static', express.static('public'));
app.use(express.json({limit:'1mb'}));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'/Quizzes.html'));
});

app.post('/lobby', (request, response)=> {//lobby
  console.log('Entrou user no sv');
  lobby++;
  response.json({teste: '1jogador'});
  console.log('1jogador');
  if (lobby===2){
    //response.json({teste: '2jogadores'});
    console.log('2jogadores');
  }

  //response.json({"user":res});
});


app.listen(port, host, function() {//poe o sv a correr
  console.log('Running at: ',host,port);
});
