//variaveis
const intervalo_frac = 99;// 1 ate X
const intervalo_variacao = 50; //-25 ate 25

//funcoes para criar fracoes

function start_frac(){
  var text = '<div class="divTable"><div class="divTableBody"><div class="divTableRow">';
  return text;
}

function end_frac(){
  var text = '</div></div></div>';
  return text;
}

function create_frac(num,denum){
  var text = '<div class="divTableCellp">(</div>';
  if (num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
  text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum) +'</div></span></div>';
  text += '<div class="divTableCellp">)</div>';
  return text;
}

function create_frac_pot(num,denum,pot){
  var text = '<div class="divTableCellp">(</div>';
  if(num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
  text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum)  +'</div></span></div>';
  text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot+'</sup></sup></div>';
  return text;
}

function create_frac_pot_pot(num,denum,pot1,pot2){
  var text = '<div class="divTableCellp">(</div>';
  text += '<div class="divTableCellp">(</div>';
  if(num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
  text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum) +'</div></span></div>';
  text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot1+'</sup></sup></div>';
  text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot2+'</sup></sup></div>';
  return text;
}

function create_custom_frac(str1,str2,sinal){
  var text = '<div class="divTableCellp">(</div>';
  if (sinal==1) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
  text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ str1 +'</div><div class="denum" id="denum1">'+ str2 +'</div></span></div>';
  text += '<div class="divTableCellp">)</div>';
  return text;
}

function create_custom_frac_pot(str1,str2,pot,sinal){
  var text = '<div class="divTableCellp">(</div>';
  if (sinal==1) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
  text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ str1 +'</div><div class="denum" id="denum1">'+ str2 +'</div></span></div>';
  text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot+'</sup></sup></div>';
  return text;
}


function mult(a,b,x,y){
  var topm = a * x;
  var botm = b * y;
  var divisor = gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function div(a,b,x,y){
	var topm = a * y;
  var botm = b * x;
	var divisor = gcd(topm, botm);
	topm = topm / divisor;
	botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function add(a,b,x,y){
	var topm = a * y + b * x;
	var botm = b * y;
	var divisor = gcd(topm, botm);
	topm = topm / divisor;
	botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function sub(a,b,x,y){
	var topm = a * y - b * x;
	var botm = b * y;
  var divisor = gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function frac_aleatoria(res){
  var sinal = 0;
  var var1 = variacao(res[0]);
  var var2 = variacao(res[1]);
  return start_frac()+create_frac(var1,var2)+end_frac();
}

funcs[0][0] = function (){
  titulo(0,0);
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var num1 = Math.floor(Math.random() * intervalo_frac) + 1;
    var denum1 = Math.floor(Math.random() * intervalo_frac) + 1;
    var num2 = Math.floor(Math.random() * intervalo_frac) + 1;
    var denum2 = Math.floor(Math.random() * intervalo_frac) + 1;
  	var op = Math.floor(Math.random() * 4) + 1;
  	if (op == 1) {
  		op = '&nbsp;<div id="cell2" class="divTableCell"> + </div>&nbsp;';
  		var resok = add(num1,denum1,num2,denum2);
  	} else if(op == 2) {
  		op = '&nbsp;<div id="cell2" class="divTableCell"> - </div>&nbsp;';
  		var resok = sub(num1,denum1,num2,denum2);
  	}else if(op == 3) {
  		op = '&nbsp;<div id="cell2" class="divTableCell"> &times; </div>&nbsp;';
  		var resok = mult(num1,denum1,num2,denum2);
  	}else if(op == 4) {
  		op = '&nbsp;<div id="cell2" class="divTableCell"> / </div>&nbsp;';
  		var resok = div(num1,denum1,num2,denum2);
  	}
    document.getElementById("enunciado"+i).innerHTML = start_frac()+create_frac(num1,denum1)+op+create_frac(num2,denum2)+end_frac();
    write_solutions(i,frac_aleatoria(resok),frac_aleatoria(resok),frac_aleatoria(resok),start_frac()+create_frac(resok[0],resok[1])+end_frac());
  }
}
