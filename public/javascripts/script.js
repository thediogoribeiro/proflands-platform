//importa os outros ficheiros js
var scripts =["/static/javascripts/three.js","/static/Mat/frac.js","/static/Mat/geom.js","/static/Mat/area.js","/static/Mat/perim.js","/static/Mat/maior_menor.js",
"/static/Mat/div_com.js","/static/Mat/vol.js","/static/Mat/pot.js","/static/Mat/frac_aprox_unidade.js","/static/Mat/mult_n_racio.js","/static/Mat/pot_frac.js",
"/static/Mat/arredonda.js","/static/Mat/pot_pot.js","/static/Mat/raizes.js","/static/Mat/graf.js","/static/Mat/reta_num.js","/static/Mat/frac_sinal.js",
"/static/Mat/func_graf.js","/static/Mat/func_graf2.js"]
for (var i = 0; i < scripts.length; i++) {
  var imported = document.createElement("script");
  imported.src = scripts[i];
  document.getElementsByTagName("head")[0].appendChild(imported);
}

//variaveis
var funcs = new Array(10);
for (var i = 0; i < funcs.length; i++) {
  funcs[i] = new Array(10);
  for (var j = 0; j < funcs[i].length; j++) {
    funcs[i][j] = new Array(10);
  }
}
const dropdwn = [
  ["Números Racionais","Potência de Potência","Raízes","Reta númerica","Frações com sinal","Maior ou Menor"]
];
const materias = [
  ["Frações", "Areas", "Perimetros", "Divisores comuns"],
  ["Volumes","Potências","Fração VS Unidade","Área colorida(Frações)","Potências(Frações)","Arredondamentos"],
  [dropdwn[0],"Grafico 1","Grafico 2"]
];
var jogador = {nome : "", ano: 0, pontos: 0};
var submete = 0;
var pagina = 0;
var modo = "erro";
var cor_certo = "#88ff91";
var cor_errado = "#ff8888";

window.onload = function() {
  hide("local_global");
  hide("solo_lobby");
  hide("casual_rank");
  hide("materia");
  //hide("ano");
  hide("disciplina");
  hide("quizzes");
};

function pag_ant(){
  if (pagina>0){
    hide("pag"+pagina);
    pagina--;
    show("pag"+pagina);
    document.getElementById("cabecalho_pag").innerHTML = "Pagina: " + (pagina + 1);
  }
}

function pag_seg(){
  if (pagina<9){
    hide("pag"+pagina);
    pagina++;
    show("pag"+pagina);
    if (pagina==9) show("bverificar");
    document.getElementById("cabecalho_pag").innerHTML = "Pagina: " + (pagina + 1);
  }
}

function hide(eid){
  document.getElementById(eid).style.display = 'none';
}

function show(eid){
  document.getElementById(eid).style.display = 'inline-block';
}

function local() {
  hide("local_global");
  show("solo_lobby");
  return false;
}

function global() {
  hide("local_global");
  show("casual_rank");
  return false;
}

function solo() {
  modo = "solo";
  hide("solo_lobby");
  show("disciplina");
  return false;
}

async function enter_lobby(){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({})
  };
  const res = await fetch('/lobby', options);
  const data = await res.json();
  console.log(data.player);
  //espera();
  after_lobby(data.player);
}

async function envia_score(player, score){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({player:player, score:score})
  };
  const res = await fetch('/1v1score', options);
  const data = await res.json();
  console.log(data);
}

async function espera(){
  var data = {status:"NO"};
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({})
  };
  setTimeout(async function(){
    while(data.status!="OK"){
      var res = await fetch('/waiting', options);
      data = await res.json();
      console.log(data);
    }
  }, 1000);
}

async function check_score(){
  const options = {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({})
  };
  const res = await fetch('/checkScore', options);
  const data = await res.json();
  alert(data.status)
}

async function after_lobby(jgdr){
  var objSol = Array(10);
  if (jgdr==='1'){
    jogador.nome="Jogador 1";
    objSol = funcs[0][0]();
    console.log(objSol);
    const options = {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(objSol)
    };
    const res = await fetch('/after_lobby', options);
    const data = await res.json();
    console.log(data);
  }else{
    jogador.nome="Jogador 2";
    const options = {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({text:"segundo jogador"})
    };
    const res = await fetch('/after_lobby', options);
    const data = await res.json();
    console.log(data);
    funcs[0][0](data);
  }
}

function mm1v1() {
  console.log("entrou lobby");
  modo = "1v1";
  hide("solo_lobby");
  titulo(0,0);
  pagina = 0;
  hide("materia");
  enter_lobby();
  show("quizzes");
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
  console.log(jogador.nome,jogador.ano);
  hide("user_input");
  show("local_global");
}

function titulo(ano,i,drop){
  if(drop!=0){
    document.getElementById("tituloMateria").innerHTML = materias[ano][i];
  }else {
    document.getElementById("tituloMateria").innerHTML = materias[ano][0][i];
  }
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
    if((typeof materia[i])=="string"){
      var nova_div = criaHTML("div","theme","theme-"+i,null,null);
      document.getElementById("materia").appendChild(nova_div);
      var novo_botao = criaHTML("button","button is-medium","b"+materia[i],materia[i],funcs[ano][i]);
      document.getElementById("theme-"+i).appendChild(novo_botao);
    }else{
      var novo_botao = criaHTML("button","button is-medium","b"+materia[i][0],materia[i][0],dd2click);
      document.getElementById("materia").appendChild(novo_botao);
      var nova_div = criaHTML("div","dropdown-content","myDropdown2",null,null);
      document.getElementById("materia").appendChild(nova_div);
      for (var j = 1; j < materia[i].length; j++) {
        var novo_link = criaHTML("a",null,null,materia[i][j],funcs[ano][0][j]);
        nova_div.appendChild(novo_link);
      }
    }
  }

  var nova_div = criaHTML("div",null,"div_muda_ano",null,null);
  document.getElementById("materia").appendChild(nova_div);
  var novo_botao = criaHTML("button","button is-small","bsairMateria","Mudar Ano",sairMateria);
  document.getElementById("div_muda_ano").appendChild(novo_botao);
}

function clear_radio(i){
  for (var j = 0; j < 4; j++) {
    document.getElementById("label"+j+i).outerHTML="";
    document.getElementById("r"+j+i).outerHTML="";
  }
}

function cria_pag(i){
  if(i==0) hide("bverificar");
  var nova_div = criaHTML("div","pag"+i,"pag"+i,null,null);
  if(i!=0) nova_div.style.display = 'none';
  document.getElementById("quizzesMain").appendChild(nova_div);
  var nova_div = criaHTML("div","enunciado"+i,"enunciado"+i,null,null);
  document.getElementById("pag"+i).appendChild(nova_div);
  var nova_div = criaHTML("div","respostas"+i,"respostas"+i,null,null);
  document.getElementById("pag"+i).appendChild(nova_div);
  var str = '<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label class="ans'+i+'" id="label0'+i+'"></label><br>';
  str += '<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label class="ans'+i+'" id="label1'+i+'"></label><br>';
  str += '<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label class="ans'+i+'" id="label2'+i+'"></label><br>';
  str += '<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label class="ans'+i+'" id="label3'+i+'"></label><br>';
  nova_div.innerHTML = str;
}

function write_solutions(i,a,b,c,d){
  document.getElementById("label0"+i).innerHTML = a;
  document.getElementById("label1"+i).innerHTML = b;
  document.getElementById("label2"+i).innerHTML = c;
  document.getElementById("label3"+i).innerHTML = d;
}

function sairMateria(){
  hide("materia");
  show("ano");
}

function sairQuiz(){
  check_score();
  var str = '<div><h1 id="tituloMateria"></h1>';
  str += '<p class="cabecalho_pag" id="cabecalho_pag">Pagina: 1</p></div>';
  str += '<div class"quizzes" id="quizzesMain"></div>';
  str += '<div><p></p><button onclick="pag_ant()" class="btn button is-small" id="banterior">Anterior</button>&nbsp;';
  str += '<button onclick="pag_seg()" class="btn button is-small" id="bseguinte">Seguinte</button><p></p>';
  str += '<button onclick="sairQuiz()" class="btn button is-small" id="bsairQuiz">Sair</button>';
  str += '<button onclick="verificar()" class="btn button is-small" id="bverificar">Submeter</button></div>';
  document.getElementById("quizzes").innerHTML=str;
  hide("quizzes");
  show("materia");
}

function verificar(){
  jogador.pontos = 0;
  for(var i = 0; i<10;i++){
    var div = document.getElementById("pag" + i);
    if(submete==0 && document.getElementById("r3"+i).checked) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==1 && conta_tabela(i)==sol[i]) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==2 && conta_tabela(i)==sol[i]) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==3 && ver_frac_uni(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==4 && ver_arredondado(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==5 && ver_reta_num(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==6 && ver_maior_menor(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==7 && ver_graf(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==8 && ver_graf2(i)) {jogador.pontos++;div.style.backgroundColor = cor_certo;}
    else div.style.backgroundColor = cor_errado;
  }
  envia_score(jogador.nome,jogador.pontos);
  if(jogador.pontos<5) alert(jogador.pontos + " pontos. Podia ser melhor");
  else if(jogador.pontos<8) alert(jogador.pontos + " pontos. Nada mau :)");
  else if(jogador.pontos<10) alert(jogador.pontos + " pontos. Muito Bom!!");
  else alert(jogador.pontos + " pontos. 1337 GAMER!!!");
}

function gcd(a,b) {
  if (b == 0) return a;
  else return gcd(b, a % b);
}

function entre(v, a, b) {
  var min = Math.min.apply(Math, [a, b]);
  var max = Math.max.apply(Math, [a, b]);
  return v > min && v < max;
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dd2click() {
  document.getElementById("myDropdown2").classList.toggle("show");
  return false;
}

function variacao(valor){
  var variacao = Math.floor(Math.random() * intervalo_variacao) + 1;
  var pos = Math.floor(Math.random() * 2) + 1;
  if (pos==1) variacao = -variacao;
  valor +=variacao;
  return valor;
}
