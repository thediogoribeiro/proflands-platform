var calc_frac = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var calc_int = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

function create_enun_frac_aprox(i){
  var final = [-1,-1,-1,-1];
  var a = Math.floor((Math.random() *8) + 2);
  var b = Math.floor((Math.random() *8) + 2);
  calc_int[i] = (Math.round(a/b));
  calc_frac[i] = (a/b);
  var text = start_frac() + create_frac(a,b);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  text += '<div class="divTableCell">' + (Math.round(a/b))+ '</div>';
  text += end_frac();
  document.getElementById("enunciado"+i).innerHTML = text;
}

function ver_frac_uni(i){
  var cell2 = document.getElementById("cell2"+i).innerHTML;
  if(cell2=="&nbsp;&gt;&nbsp;" && (calc_frac[i]>calc_int[i])) return true;
  else if(cell2=="&nbsp;&lt;&nbsp;" && (calc_frac[i]<calc_int[i])) return true;
  else if(cell2=="&nbsp;=&nbsp;" && (calc_frac[i]=calc_int[i])) return true;
}

function make_radios(i){
  document.getElementById("r3"+i).outerHTML = "";
  document.getElementById("label3"+i).outerHTML = "";
  document.getElementById("label0"+i).innerHTML = "<";
  document.getElementById("label1"+i).innerHTML = ">";
  document.getElementById("label2"+i).innerHTML = "=";
  document.getElementById("r0"+i).value = "&nbsp;&lt;&nbsp;";
  document.getElementById("r1"+i).value = "&nbsp;&gt;&nbsp;";
  document.getElementById("r2"+i).value = "&nbsp;=&nbsp;";
  document.getElementById("r0"+i).onclick = function() {change_radio(this,i)};
  document.getElementById("r1"+i).onclick = function() {change_radio(this,i)};
  document.getElementById("r2"+i).onclick = function() {change_radio(this,i)};
}

function change_radio(item,i){
  document.getElementById("cell2"+i).innerHTML=item.value;
}


funcs[1][2] = function (){
  titulo(1,2);
  submete=3;
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = [-1,-1,-1,-1]
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    make_radios(i);
    create_enun_frac_aprox(i);
  }
}
