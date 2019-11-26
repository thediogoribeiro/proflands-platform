
class lobby {
	constructor(id, waiting, ano, jogadores, maxJogadores, data, exec, sol) {
		this._id = id;
		this._waiting = waiting;
		this._ano = ano;
		this._jogadores =[jogadores];
		this._maxJogadores = maxJogadores;
		this._data = data;
		this._exec = exec;
		this._solutions = sol;
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

const materias = [
	["Frações", "Areas", "Perimetros", "Divisores comuns"],
	["Volumes","Potências","Fração VS Unidade","Área colorida(Frações)","Potências(Frações)","Arredondamentos"],
	["Potência de Potência","Raízes","Reta númerica","Frações com sinal","Maior ou Menor","Grafico 1","Grafico 2"]
];

const MAX_LOBBYS = 100;
const MAX_LOBBY_PLAYERS = 3;
const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const script = require('./script');
const rooms = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

server.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});


io.on('connection', socket => {
  socket.on('new-user', (lobby, name) => {
		socket.join(lobby)
    rooms[lobby].users[socket.id] = name
    socket.to(lobby).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (lobby, message) => {
    socket.to(lobby).broadcast.emit('chat-message', { message: message, name: rooms[lobby].users[socket.id] })
  })
  socket.on('disconnect', () => {
		getUserRooms(socket).forEach(lobby =>{
			socket.broadcast.emit('user-disconnected', rooms[lobby].users[socket.id])
			delete rooms[lobby].users[socket.id]
		})
  })
})

function getUserRooms(socket){
	return Object.entries(rooms).reduce((names, [name, lobby])=>{
		if(lobby.users[socket.id]!=null) names.push(name)
		return names
	},[])
}

var lobbys = new Array(MAX_LOBBYS);
var solutions = new Array(10);

app.post('/soloScore',(req, res) => {
	var page = new Array(10);
	var sol = req.body.solution;
	var pontos = 0;
	for(var i = 0; i<10; i++){
		//console.log(solutions[i]," <=> ",sol[i]);
		if(solutions[i]==sol[i]){
			pontos++;
			page[i]="ok";
		}
	}
	//console.log(pontos);
	res.send({score:pontos,page:page});
});

app.post('/getLocalPage',(req, res) => {
	var quizPage ="";
	var exec = new Array(10);
	var submete = 0;
	for(var i = 0; i<10; i++){
		const data = pickFunc(i,req.body.materia);
		if (data.type==2) submete = 2;
		if (data.type==3) submete = 1;
		solutions[i] = data.f.solution;
		exec[i] = data.f.exec;
		quizPage+=script.buildPage(i, data.f.q, data.f.cs );
	}
	console.log(solutions);
	res.send({quizPage:quizPage, sub:submete, exec:exec});
});

app.post('/getLobbyPage',(req, res) => {
	var exec = new Array(10);
	var sol = new Array(10);
	var quizPage ="";
	var submete = 0;
	var cont=0;
	while(lobbys[cont].id!=req.body.jg.lobbyID){
		cont++;
	}
	if(req.body.jg.num==1) {
		var ano=req.body.jg.ano-5;
		for(var i = 0; i<10; i++){
			var r = Math.floor(Math.random() * materias[ano].length);
			const data = pickFunc(i,materias[ano][r]);
			if (data.type==2) submete = 2;
			if (data.type==3) submete = 1;
			sol[i] = data.f.solution;
			exec[i] = data.f.exec;
			quizPage+=script.buildPage(i, data.f.q, data.f.cs );
		}
		lobbys[cont].solutions = sol;
		lobbys[cont].exec = exec;
		lobbys[cont].data = quizPage;
	}
	res.send({quizPage:lobbys[cont].data, sub:submete, exec:lobbys[cont].exec});
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
			if(req.body.user.num==1){
				console.log(lobbys[cont].id," Lobby completo, a entregar questionarios aos jogadores... ... ...");
				console.log("Solucoes: ", cleanSolutions(lobbys[cont].solutions));
			}
		}else {
			res.send({status:"NO"});
		}
	}else if(req.body.type=="LEAVE"){
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

app.post('/lobbyScore',(req, res) => {
	var page = new Array(10);
	var cont = 0;
	var prontos = 0;
	while(lobbys[cont].id!=req.body.jogador.lobbyID){
		cont++;
	}
	const nUsers =lobbys[cont].jogadores.length;
	const user = lobbys[cont].jogadores;
	var sol = req.body.solution;
	var pontos = 0;
	for(var i = 0; i<nUsers; i++){
		if(user[i].num==req.body.jogador.num){
			for(var j = 0; j<10; j++){
				if(lobbys[cont].solutions[j]==sol[j]){
					page[j]="ok";
					pontos++;
				}
			}
			lobbys[cont].jogadores[i].pontos = pontos;
			lobbys[cont].jogadores[i].pronto = 1;
			console.log("user nº ", req.body.jogador.num, " finished with ",pontos," points");
		}
		if(lobbys[cont].jogadores[i].pronto == 1) prontos++;
	}
	if (prontos==MAX_LOBBY_PLAYERS) res.send({status:"score saved", last:"TRUE",page:page});
	else res.send({status:"score saved", last:"FALSE",page:page});
	page=null;
	return;
});

app.post('/checkScore',(req, res) => {
	if(req.body.user.num==1) console.log("All users finished");
	var cont=0;
	var flag = 0;
	while(lobbys[cont].id!=req.body.user.lobbyID){
		cont++;
	}
	res.send({ list:lobbys[cont].jogadores });
});

app.post('/lobby',(req, res) => {
	var cont=0;
	while(lobbys[cont]!=null){
		if(lobbys[cont].jogadores.length < lobbys[cont].maxJogadores){
			if(lobbys[cont].ano===req.body.jogador.ano){
				var novo_jogador = req.body.jogador;
				novo_jogador.lobbyID=lobbys[cont].id;
				novo_jogador.num=lobbys[cont].jogadores.length+1;
				lobbys[cont].jogadores.push(novo_jogador);
				res.send({ lobbyID:lobbys[cont].id, player: novo_jogador.num, maxPlayers:MAX_LOBBY_PLAYERS });
				console.log("--Jogador ",novo_jogador.num," entrou no lobby: ",lobbys[cont].id);
				return;
			}
		}
		cont++;
	}
	var ID = Math.floor(Math.random() * 99999)
	console.log("Novo lobby com o ID: ",ID);
	res.send({ lobbyID:ID, player: 1 , maxPlayers:MAX_LOBBY_PLAYERS});
	var novo_jogador = req.body.jogador;
	novo_jogador.lobbyID=ID;
	novo_jogador.num=1;
	lobbys[cont] = new lobby(ID,0, req.body.jogador.ano, novo_jogador, MAX_LOBBY_PLAYERS, null, null, null);
	rooms[ID] = { users:{}}
	console.log("--Jogador ",novo_jogador.num," entrou no lobby: ",ID);
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

function cleanSolutions(s){
	var sol = new Array(10);
	for(var km = 0; km<10;km++){
		if((typeof s[km])=="string"){
			sol[km] = s[km].replace('<div class="divTable"><div class="divTableBody"><div class="divTableRow"><div class="divTableCellp">','')
			sol[km] = sol[km].replace('(</div><div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">','');
			sol[km] = sol[km].replace('(</div><div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">','');
			sol[km] = sol[km].replace('</div></span></div><div class="divTableCellp">)</div></div></div></div>','');
			sol[km] = sol[km].replace('</div><div class="denum" id="denum1">','/');
			sol[km] = sol[km].replace('(</div><div id="cell2" class="divTableCelle"> -&nbsp;</div><div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">','-');
		}else{
			sol[km] = s[km];
		}
	}
	return sol;
}

function pickFunc(i,materia){
	switch(materia) {
		case 'Frações':
		const frac = require('./Mat/5/frac');
		return {f:frac.f(i),type:0};
		break;
		case 'Areas':
		const area = require('./Mat/5/area');
		return {f:area.f(i),type:0};
		break;
		case 'Perimetros':
		const perim = require('./Mat/5/perim');
		return {f:perim.f(i),type:0};
		break;
		case 'Divisores comuns':
		const divCom = require('./Mat/5/div-com');
		return {f:divCom.f(i),type:0};
		break;
		case 'Volumes':
		const vol = require('./Mat/6/volume');
		return {f:vol.f(i),type:0};
		break;
		case 'Potências':
		const pot = require('./Mat/6/pot');
		return {f:pot.f(i),type:0};
		break;
		case 'Fração VS Unidade':
		const fVSu = require('./Mat/6/fracVSunidade');
		return {f:fVSu.f(i),type:0};
		break;
		case 'Área colorida(Frações)':
		const ac = require('./Mat/6/area-colorida');
		return {f:ac.f(i),type:3};
		break;
		case 'Potências(Frações)':
		const pf = require('./Mat/6/pot-frac');
		return {f:pf.f(i),type:0};
		break;
		case 'Arredondamentos':
		const a = require('./Mat/6/arredonda');
		return {f:a.f(i),type:0};
		break;
		case 'Potência de Potência':
		const pp = require('./Mat/7/pot-pot');
		return {f:pp.f(i),type:0};
		break;
		case 'Raízes':
		const r = require('./Mat/7/raizes');
		return {f:r.f(i),type:0};
		break;
		case 'Reta númerica':
		const rn = require('./Mat/7/reta-num');
		return {f:rn.f(i),type:2};
		break;
		case 'Frações com sinal':
		const fs = require('./Mat/7/frac-sinal');
		return {f:fs.f(i),type:0};
		break;
		case 'Maior ou Menor':
		const mm = require('./Mat/7/maior-menor');
		return {f:mm.f(i),type:0};
		break;
		case 'Grafico 1':
		const g1 = require('./Mat/7/grafico1');
		return {f:g1.f(i),type:2};
		break;
		case 'Grafico 2':
		const g2 = require('./Mat/7/grafico2');
		return {f:g2.f(i),type:2};
		break;
		default:
		console.log('Nenhuma funcao executada', materia, i);
	}
}
