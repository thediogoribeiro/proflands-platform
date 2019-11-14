
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
	var submete = 0;
	var image = new Array(10);
	for(var i = 0; i<10; i++){
		const data = pickFunc(i,req.body.materia);
		if (data.type==3) submete = 1;
		solutions[i] = data.f.solution;
		if (data.f.image!=undefined) image[i] = data.f.image;
		quizPage+=script.buildPage(i, data.f.q, data.f.s1, data.f.s2, data.f.s3, data.f.s4,data.type);
	}
	if(image[0] == null) res.send({quizPage:quizPage, image:'none', sub:submete});
	else res.send({quizPage:quizPage, image:image, sub:submete});
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
		return {f:frac.f(i),type:1};
		break;
		case 'Areas':
		const area = require('./Mat/5/area');
		return {f:area.f(i),type:1};
		break;
		case 'Perimetros':
		const perim = require('./Mat/5/perim');
		return {f:perim.f(i),type:1};
		break;
		case 'Divisores comuns':
		const divCom = require('./Mat/5/div-com');
		return {f:divCom.f(i),type:1};
		break;
		case 'Volumes':
		const vol = require('./Mat/6/volume');
		//return vol.f(i); NOT WORKING
		break;
		case 'Potências':
		const pot = require('./Mat/6/pot');
		return {f:pot.f(i),type:1};
		break;
		case 'Fração VS Unidade':
		const fVSu = require('./Mat/6/fracVSunidade');
		return {f:fVSu.f(i),type:2};
		break;
		case 'Área colorida(Frações)':
		const ac = require('./Mat/6/area-colorida');
		return {f:ac.f(i),type:3};
		break;
		case 'Potências(Frações)':
		const pf = require('./Mat/6/pot-frac');
		return {f:pf.f(i),type:1};
		break;
		case 'Arredondamentos':
		const a = require('./Mat/6/arredonda');
		return {f:a.f(i),type:1};
		break;
		case 'Potência de Potência':
		const pp = require('./Mat/7/pot-pot');
		return {f:pp.f(i),type:1};
		break;
		default:
		console.log('Nenhuma funcao executada', materia, i);
	}
}
