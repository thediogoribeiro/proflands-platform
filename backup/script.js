//importa os outros ficheiros js
var scripts =["three.js","Mat/frac.js","Mat/geom.js","Mat/area.js","Mat/perim.js","Mat/maior_menor.js",
"Mat/div_com.js","Mat/vol.js","Mat/pot.js","Mat/frac_aprox_unidade.js","Mat/mult_n_racio.js","Mat/pot_frac.js",
"Mat/arredonda.js","Mat/pot_pot.js","Mat/raizes.js","Mat/graf.js","Mat/reta_num.js","Mat/frac_sinal.js",
"Mat/func_graf.js","Mat/func_graf2.js"]
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
var dropdwn = [
  ["Números Racionais","Potência de Potência","Raízes","Reta númerica","Frações com sinal","Maior ou Menor"]
];
var materias = [
	["Frações", "Areas", "Perimetros", "Divisores comuns"],
	["Volumes","Potências","Fração VS Unidade","Área colorida(Frações)","Potências(Frações)","Arredondamentos"],
  [dropdwn[0],"Grafico 1","Grafico 2"]
];
var submete = 0;
var pagina = 0;
var cor_certo = "#d9fdd7";
var cor_errado = "#fdd7d8";

window.onload = function() {
	hide("solo_lobby");
	hide("casual_rank");
	hide("materia");
	hide("ano");
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
  show("solo_lobby")
	return false;
}

function global() {
	hide("local_global");
  show("casual_rank")
	return false;
}

function solo() {
	hide("solo_lobby");
  show("disciplina")
	return false;
}

function mat(){
	hide("disciplina");
	show("ano");
}

function ano(ano){
	hide("ano");
	show("materia");
	materia(ano-5,materias[ano-5]);
}

function lobby() {
	hide("local_global");
	return false;
}

function casual() {
	hide("local_global");
	return false;
}

function rank() {
	hide("local_global");
	return false;
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
      var novo_botao = criaHTML("button","dropbtn","b"+materia[i],materia[i],funcs[ano][i]);
      document.getElementById("materia").appendChild(novo_botao);
    }else{
      var novo_botao = criaHTML("button","dropbtn","b"+materia[i][0],materia[i][0],dd2click);
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
  var novo_botao = criaHTML("button","dropbtn","bsairMateria","Mudar ano",sairMateria);
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
  var nova_div = criaHTML("div","pag"+i,"enunciado"+i,null,null);
  document.getElementById("pag"+i).appendChild(nova_div);
  var nova_div = criaHTML("div","pag"+i,"respostas"+i,null,null);
  document.getElementById("pag"+i).appendChild(nova_div);
  var str = '<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'"></label><br>';
  str += '<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'"></label><br>';
  str += '<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'"></label><br>';
  str += '<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'"></label><br>';
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

function theFunction(e)
{ alert(e.target.id);}

function sairQuiz(){
  var str = '<div><h1 id="tituloMateria"></h1>';
  str += '<p class="cabecalho_pag" id="cabecalho_pag">Pagina: 1</p></div>';
  str += '<div class"quizzes" id="quizzesMain"></div>';
  str += '<div><p></p><button onclick="pag_ant()" class="dropbtn" id="banterior">Anterior</button>&nbsp;';
  str += '<button onclick="pag_seg()" class="dropbtn" id="bseguinte">Seguinte</button><p></p>';
  str += '<button onclick="sairQuiz()" class="dropbtn" id="bsairQuiz">Sair</button>';
  str += '<button onclick="verificar()" class="dropbtn" id="bverificar">Submeter</button></div>';
  document.getElementById("quizzes").innerHTML=str;
  hide("quizzes");
  show("materia");
}

function verificar(){
  var pontos = 0;
  for(var i = 0; i<10;i++){
    var div = document.getElementById("pag" + i);
    if(submete==0 && document.getElementById("r3"+i).checked) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==1 && conta_tabela(i)==sol[i]) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==2 && conta_tabela(i)==sol[i]) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==3 && ver_frac_uni(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==4 && ver_arredondado(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==5 && ver_reta_num(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==6 && ver_maior_menor(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==7 && ver_graf(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else if (submete==8 && ver_graf2(i)) {pontos++;div.style.backgroundColor = cor_certo;}
    else div.style.backgroundColor = cor_errado;
  }
  if(pontos<5) alert(pontos + " pontos. Podia ser melhor");
  else if(pontos<8) alert(pontos + " pontos. Nada mau :)");
  else if(pontos<10) alert(pontos + " pontos. Muito Bom!!");
  else alert(pontos + " pontos. 1337 GAMER!!!");
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
