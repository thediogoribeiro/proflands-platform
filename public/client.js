//importa os outros ficheiros js
// var scripts = ["/static/three.js","/static/Mat/frac.js","/static/Mat/geom.js","/static/Mat/area.js","/static/Mat/perim.js","/static/Mat/maior_menor.js",
// "/static/Mat/div_com.js","/static/Mat/vol.js","/static/Mat/pot.js","/static/Mat/frac_aprox_unidade.js","/static/Mat/mult_n_racio.js","/static/Mat/pot_frac.js",
// "/static/Mat/arredonda.js","/static/Mat/pot_pot.js","/static/Mat/raizes.js","/static/Mat/graf.js","/static/Mat/reta_num.js","/static/Mat/frac_sinal.js",
// "/static/Mat/func_graf.js","/static/Mat/func_graf2.js"];

// for (var i = 0; i < scripts.length; i++) {
//   var imported = document.createElement("script");
//   imported.src = scripts[i];
//   document.getElementsByTagName("head")[0].appendChild(imported);
// }

//variaveis
var funcs = new Array(10);
for (var i = 0; i < funcs.length; i++) {
  funcs[i] = new Array(10);
  // for (var j = 0; j < funcs[i].length; j++) {
  //   funcs[i][j] = new Array(10);
  // }
}

window.onload = function() {
  buildUserInput();
};

//const frac = require('./frac');
var maxLobbyPlayers;
const materias = [
  ["Frações", "Areas", "Perimetros", "Divisores comuns"],
  ["Volumes","Potências","Fração VS Unidade","Área colorida(Frações)","Potências(Frações)","Arredondamentos"],
  ["Potência de Potência","Raízes","Reta númerica","Frações com sinal","Maior ou Menor","Grafico 1","Grafico 2"]
];

var jogador = {lobbyID: 0, nome : "", num: 0, ano: 0, pontos: 0, pronto: 0};
var submete = 0;
var pagina = 0;
var modo = "erro";
var cor_certo = "#88ff91";
var cor_errado = "#ff8888";

function buildLobbyRoom(){
  var str='A esprea que todos os jogadores entrem... ... ...';
  document.getElementById("lobby_room").innerHTML = str;
}

function buildChatRoom(){
  var str='A esprea que todos os jogadores terminem... ... ...';
  document.getElementById("chat_room").innerHTML = str;
}

function buildUserInput(){
  var str="<input type='text' id='userName' name='userName' value=''><br>";
  str+="<select id='userYear'>";
  str+="<option value='5'>5</option>";
  str+="<option value='6'>6</option>";
  str+="<option value='7'>7</option>";
  str+="</select><br>";
  str+="<button onclick='getUserInput()' class='dropbtn' id='bgetUserInput'>Login</button>";
  document.getElementById("user_input").innerHTML = str;
}

function buildQuiz(){
  var str = '<div><h1 id="tituloMateria"></h1>';
  str += '<p class="cabecalho_pag" id="cabecalho_pag">Pagina: 1</p></div>';
  str += '<p></p><button onclick="pag_ant()" class="dropbtn" id="banterior">Anterior</button>&nbsp;';
  str += '<button onclick="pag_seg()" class="dropbtn" id="bseguinte">Seguinte</button><p></p>';
  str += '<div class"quizzes" id="quizzesMain"></div>';
  str += '<div><p></p><button onclick="sairQuiz()" class="dropbtn" id="bsairQuiz">Sair</button>';
  str += '<button onclick="verificar()" class="dropbtn" id="bverificar">Submeter</button></div>';
  document.getElementById("quizzes").innerHTML=str;
}

function buildChatRoom(){
  document.getElementById("quizzes").innerHTML="A espera que todos os jogadores terminem... ... ...";
}

function buildLobbyRoom(){
  document.getElementById("quizzes").innerHTML="A espera que todos os jogadores entrem... ... ...";
}

function buildLocalGlobal(){
  str = '<button onclick="local()" class="dropbtn" id="blocal">Local</button>';
  str += '<button onclick="global()" class="dropbtn" id="bglobal">Global</button>';
  document.getElementById("local_global").innerHTML=str;
}

function hide(eid){
  document.getElementById(eid).style.display = 'none';
}

function show(eid){
  document.getElementById(eid).style.display = 'inline-block';
}

function local() {
  hide("local_global");
  var str="<button onclick='solo()' class='dropbtn' id='bsolo'>Solo</button>";
  str+="<button onclick='mmLobby()' class='dropbtn' id='blobby'>Lobby</button>";
  document.getElementById("solo_lobby").innerHTML = str;
}

function global() {
  hide("local_global");
  var str="<button onclick='casual()' class='dropbtn' id='bcasual'>Casual</button>";
  str+="<button onclick='rank()' class='dropbtn' id='brank'>Rank</button>";
  document.getElementById("casual_rank").innerHTML = str;
}

function solo() {
  jogador.num=1;
  modo = "solo";
  hide("solo_lobby");
  var str="<button onclick='mat()' class='dropbtn' id='bmat'>Matemática</button>";
  str+="<button onclick='cien()' class='dropbtn' id='bcien'>Ciências</button>";
  str+="<button onclick='geo()' class='dropbtn' id='bgeo'>Geografia</button>";
  document.getElementById("disciplina").innerHTML = str;
  show("disciplina");
}


function mmLobby() {
  modo = "Lobby";
  hide("solo_lobby");
  pagina = 0;
  hide("materia");
  enter_lobby();
  return false;
}

function mat(){
  hide("disciplina");
  show("materia");
  materia(jogador.ano-5,materias[jogador.ano-5]);
}

function casual() {
  hide("local_global");
  return false;
}

function rank() {
  hide("local_global");
  return false;
}

function getUserInput(){
  var e = document.getElementById("userYear");
  jogador.nome = document.getElementById("userName").value
  jogador.ano = e.options[e.selectedIndex].value;
  hide("user_input");
  buildLocalGlobal();
}

function criaHTML(element,className,id,inner,click){
  var html = document.createElement(element);
  if(className!=null)html.className=className;
  if(id!=null)html.id=id;
  if(inner!=null)html.innerHTML = inner;
  if(click!=null)html.addEventListener("click", click);
  return html;
}

function materia(ano,materia){
  document.getElementById("materia").innerHTML="";
  for (var i = 0; i < materia.length; i++) {
    var novo_botao = document.createElement('button');
    novo_botao.className="dropbtn";
    novo_botao.id="b"+materia[i];
    novo_botao.innerHTML = materia[i];
    novo_botao.addEventListener("click", getPage.bind(null, event, materia[i]));
    document.getElementById("materia").appendChild(novo_botao);
  }
  var nova_div = criaHTML("div",null,"div_muda_ano",null,null);
  document.getElementById("materia").appendChild(nova_div);
}

async function getPage(e,m){
  var res;
  buildQuiz();
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({materia:m, jg:jogador})
  };
  if (modo=="Lobby") res = await fetch('/getLobbyPage', options);
  else if (modo=="solo") {
    show("quizzes");
    res = await fetch('/getLocalPage', options);
  }
  const data = await res.json();
  submete = data.sub;
  hide("materia");
  document.getElementById("quizzesMain").innerHTML=data.quizPage;
  console.log("Exec data: ",data.exec);
  for(var i = 0; i<10;i++){
    if(data.exec[i]!=null) eval(data.exec[i]);
  }
  document.getElementById("banterior").disabled = true;
  hide("bverificar");

}

function pag_ant(){
  if (pagina>0){
    hide("pag"+pagina);
    pagina--;
    show("pag"+pagina);
    document.getElementById("cabecalho_pag").innerHTML = "Pagina: " + (pagina + 1);
    document.getElementById("bseguinte").disabled = false;
    if (pagina==0){
      document.getElementById("banterior").disabled = true;
    }
  }
}

function pag_seg(){
  if (pagina<9){
    hide("pag"+pagina);
    pagina++;
    show("pag"+pagina);
    document.getElementById("cabecalho_pag").innerHTML = "Pagina: " + (pagina + 1);
    document.getElementById("banterior").disabled = false;
    if (pagina==9){
      show("bverificar");
      document.getElementById("bseguinte").disabled = true;
    }
  }
}

function verificar(){
  var sol = new Array(10);
  if (submete==0){
    for (var i = 0; i < 10; i++){
      var radios = document.getElementsByName('solucao'+i);
      for (var j = 0; j < radios.length; j++){
        if (radios[j].checked) {
          sol[i] = document.getElementById("label"+radios[j].value+i).innerHTML;
          break;
        }
      }
    }
  }else if (submete==1){
    for (var i = 0; i < 10; i++){
      sol[i] = conta_tabela(i);
    }
  }else if (submete==2){
    sol = verificarRetaORGraf(i);
  }
  if (modo=="Lobby") sendLobbyScore(sol);
  else if (modo=="solo") sendSoloScore(sol);
}



function change_radio(item,i){
  var labelText = document.getElementById("label"+item.value+i).innerHTML
  document.getElementById("cell2"+i).innerHTML=labelText;
}

function changeColor(td){
  td.style.backgroundColor=(td.style.backgroundColor=='blue')?('transparent'):('blue');
}

function conta_tabela(i){
  var table = document.getElementById("tabela_cores" + i);
  var n_cells = table.rows[0].cells;
  var selct_cells = 0;
  for (j = 0; j< table.rows.length; j++){
    for (var i = 0; i < table.rows[j].cells.length; i++){
      if(table.rows[j].cells[i].style.backgroundColor=='blue')selct_cells++;
    }
  }
  return selct_cells;
}

async function enter_lobby(){
  buildLobbyRoom();
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({jogador:jogador})
  };
  const res = await fetch('/lobby', options);
  const data = await res.json();
  jogador.lobbyID = data.lobbyID;
  jogador.num = data.player;
  console.log("Jogador: ",jogador.num ,"Entrou no lobby: ", jogador.lobbyID);
  maxLobbyPlayers=data.maxPlayers;
  console.log(data.player," ",data.maxPlayers);
  if (data.player<data.maxPlayers){
    hide("quizzes");
    show("lobby_room");
    console.log(jogador.num," espera");
    espera("lobby_room","quizzes",0);
  }
  after_lobby(jogador.ano-5);
}

function espera(str1,str2,flag){
  var options;
  if (flag==1){
    options = {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ user:jogador, type:"LEAVE" })
    };
  }else{
    options = {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ user:jogador, type:"ENTER" })
    };
  }
  async function go() {
    const res = await fetch('/waiting', options);
    const data = await res.json();
    console.log(data.status);
    if (data.status=="YES") {
      if (flag===1) check_score();
      hide(str1);
      show(str2);
      return "YES";
    }else{
      setTimeout(go, 1000);
    }
  }
  go();
}

async function sendLobbyScore(sol){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ jogador:jogador,solution:sol })
  };
  const res = await fetch('/lobbyScore', options);
  const data = await res.json();
  if (data.last=="FALSE"){
    hide("quizzes");
    show("chat_room");
    espera("chat_room","quizzes",1);
  }else check_score();
  console.log(data);
}

async function sendSoloScore(sol){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({solution:sol})
  };
  const res = await fetch('/soloScore', options);
  const data = await res.json();
  alert(data.score);
}

async function check_score(){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ user: jogador})
  };
  const res = await fetch('/checkScore', options);
  const data = await res.json();
  console.log(data.list);
}

async function after_lobby(ano){
  pagina = 0;
  hide("materia");
  show("quizzes");
  getPage('',"Lobby");
  if (jogador.num<maxLobbyPlayers){
    hide("quizzes");
    show("lobby_room");
  }else{
    hide("lobby_room");
    show("quizzes");
  }
}

function sairQuiz(){
  var str='<div class="user_input" id="user_input"></div>';
  str='<div class="local_global" id="local_global"></div>';
  str='<div class="solo_lobby" id="solo_lobby"></div>';
  str='<div class="casual_rank" id="casual_rank"></div>';
  str='<div class="disciplina" id="disciplina"></div>';
  str='<div class="materia" id="materia"></div>';
  str='<div class="lobby_room" id="lobby_room" style="display: none;">';
  str='A espera que todos os jogadores entrem ... ... ...</div>';
  str='<div class="chat_room" id="chat_room" style="display: none;">';
  str='A espera que todos os jogadores entrem ... ... ...</div>';
  str='<div class="quizzes" id="quizzes"></div>';
  hide("quizzes");
  show("solo_lobby");
  pagina = 0;
  jogador.lobbyID = 0;
  jogador.num = 0;
  jogador.pontos = 0;
  jogador.pronto = 0;
  submete = 0;
  modo = "erro";
}
