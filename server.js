
class lobby {
	constructor(id, waiting, ano, jogadores, maxJogadores, data) {
		this._id = id;
		this._waiting = waiting;
		this._ano = ano;
		this._jogadores =[jogadores];
		this._maxJogadores = maxJogadores;
		this._data = data;
	}
	set waiting(w){
		this._waiting=w;
	}
	get waiting(){
		return this._waiting;
	}
	set ano(a){
		this._ano=a;
	}
	get ano(){
		return this._ano;
	}
	set maxJogadores(m){
		this._maxJogadores = m;
	}
	get maxJogadores(){
		return this._maxJogadores;
	}
	set jogadores(j){
		this._jogadores.push(j);
	}
	get jogadores(){
		return this._jogadores;
	}
	set id(i){
		this._id = i;
	}
	get id(){
		return this._id;
	}
}

const MAX_LOBBYS = 100;
const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const script = require('./script');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});

app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

var lobbys = new Array(MAX_LOBBYS);
var solutions = new Array(10);

app.post('/verificar',(req, res) => {
	var sol = req.body.solution;
	var pontos = 0;
	for(var i = 0; i<10; i++){
		if(solutions[i]===sol[i]) pontos++;
	}
	res.send({score:pontos});
});

app.post('/getPage',(req, res) => {
	var quizPage ="";
	var image = new Array(10);
	for(var i = 0; i<10; i++){
		const data = pickFunc(i,req.body.materia);
		solutions[i] = data.solution;
		if (data.image!=undefined) image[i] = data.image;
		quizPage+=script.buildPage(i, data.q, data.s1, data.s2, data.s3, data.s4);
	}
	if(image === undefined || image.length == 0) res.send({quizPage:quizPage, image:image});
	else res.send({quizPage:quizPage, image:'none'});
});

app.post('/waiting',(req, res) => {
	var cont=0;
	var prontos=0;
	while(lobbys[cont].id!=req.body.user.lobbyID){
		cont++;
	}
	const nUsers =lobbys[cont].jogadores.length;
	const user = lobbys[cont].jogadores;
	if(req.body.type=="ENTER"){
		if(nUsers==lobbys[cont].maxJogadores){
			res.send({status:"YES"});
		}else {
			res.send({status:"NO"});
		}
	}else{
		for(var i = 0; i<nUsers; i++){
			if(user[i].pronto == 1) prontos++;
		}
		if(prontos==lobbys[cont].maxJogadores){
			res.send({status:"YES"});
		}else {
			res.send({status:"NO"});
		}
	}
});

app.post('/1v1score',(req, res) => {
	var cont = 0;
	var prontos = 0;
	while(lobbys[cont].id!=req.body.jogador.lobbyID){
		cont++;
	}
	console.log("lobby: ",lobbys[cont]);
	const nUsers =lobbys[cont].jogadores.length;
	const user = lobbys[cont].jogadores;
	for(var i = 0; i<nUsers; i++){
		if(user[i].num==req.body.jogador.num){
			lobbys[cont].jogadores[i].pontos = req.body.jogador.pontos;
			lobbys[cont].jogadores[i].pronto = 1;
		}
		if(lobbys[cont].jogadores[i].pronto == 1){
			prontos++;
		}
	}
	if (prontos==1) res.send({status:"score saved", first:"TRUE"});
	else res.send({status:"score saved", first:"FALSE"});
	return;
});

app.post('/checkScore',(req, res) => {
	var cont=0;
	while(lobbys[cont].id!=req.body.user.lobbyID){
		cont++;
	}
	res.send({ list:lobbys[cont].jogadores });
});

app.post('/lobby',(req, res) => {
	var cont=0;
	while(lobbys[cont]!=null){
		console.log("numero jogadores: ", lobbys[cont].jogadores.length," MAX: ",lobbys[cont].maxJogadores);
		if(lobbys[cont].jogadores.length < lobbys[cont].maxJogadores){
			if(lobbys[cont].ano===req.body.jogador.ano){
				var novo_jogador = req.body.jogador;
				novo_jogador.lobbyID=lobbys[cont].id;
				novo_jogador.num=lobbys[cont].jogadores.length+1;
				lobbys[cont].jogadores.push(novo_jogador);
				res.send({ lobbyID:lobbys[cont].id, player: novo_jogador.num });
				console.log("Jogador registado no lobby: ",lobbys[cont].id);
				console.log("lobby: ",lobbys[cont]);
				return;
			}
		}
		cont++;
	}
	var ID = Math.floor(Math.random() * 99999)
	console.log("Novo lobby com o ID: ",ID);
	res.send({ lobbyID:ID, player: 1 });
	var novo_jogador = req.body.jogador;
	novo_jogador.lobbyID=ID;
	novo_jogador.num=1;
	lobbys[cont] = new lobby(ID,0, req.body.jogador.ano, novo_jogador, 2, null);
	console.log("Jogador entrou no lobby: ",ID);
	console.log("lobby: ",lobbys[cont]);
});

app.post('/after_lobby',(req, res) => {
	var cont=0;
	while(lobbys[cont].id!=req.body.lobbyID){
		cont++;
	}
	if(req.body.num==1){
		lobbys[cont].data = {f:req.body.f, data:req.body.data};
		res.send({ status: 'SUCCESS' });
	}else{
		res.send(lobbys[cont].data);
	}
});

function pickFunc(i,materia){
	switch(materia) {
		case 'Frações':
		const frac = require('./Mat/5/frac');
		return frac.f(i);
		break;
		case 'Areas':
		const area = require('./Mat/5/area');
		return area.f(i);
		break;
		default:
		console.log('Nenhuma funcao executada', materia, i);
	}
}
