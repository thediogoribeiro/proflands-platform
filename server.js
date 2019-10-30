const host = '0.0.0.0';
const port = '3000';
const express = require('express');
const path = require('path');
const app = express();

var lobby=0;

app.use('/static', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.post('/lobby',(req, resp) => {
  lobby++;
  console.log(lobby);
  if(lobby===2){
    console.log("2 jogadores");
  }
});


app.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});
