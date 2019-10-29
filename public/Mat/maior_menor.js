var calc1 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var calc2 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

function create_enun_frac1(i,a,b){
  var pot = Math.floor((Math.random() *3) + 1);
  if (a<0) var sinal = 1;
  calc1[i]=(a/b)**pot;
  var text = start_frac() + create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  calc2[i] = ((a**pot)/b);
  text += create_custom_frac(a+'<sup>'+pot+'</sup>',b,sinal);
  text += end_frac();
  document.getElementById("enunciado"+i).innerHTML = text;
}

function create_enun_fracVSuni(i,a,b){
  var pot = Math.floor((Math.random() *3) + 1);
  calc1[i]=(a/b)**pot;
  var text = start_frac() + create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  calc2[i]=(Math.round(a**pot/b**pot));
  text += '<div class="divTableCell">' + (Math.round(a**pot/b**pot))+ '</div>';
  text += end_frac();
  document.getElementById("enunciado"+i).innerHTML = text;
}

function ver_maior_menor(i){
  var cell2 = document.getElementById("cell2"+i).innerHTML;
  if(cell2=="&nbsp;&gt;&nbsp;" && (calc1[i]>calc2[i])) return true;
  else if(cell2=="&nbsp;&lt;&nbsp;" && (calc1[i]<calc2[i])) return true;
  else if(cell2=="&nbsp;=&nbsp;" && (calc1[i]=calc2[i])) return true;
}

function create_enun_frac2(i,a,b){
  var dif = Math.floor((Math.random() *2) + 1);
  var pot = Math.floor((Math.random() *3) + 1);
  if (a<0) var sinal = 1;
  a = Math.abs(a);
  if (dif==1) {
    calc1[i]=(Math.sqrt(a)**pot)/b;
    var str = '(&#8730;' +a+')<sup>'+pot+'</sup>';
  }
  else {
    calc1[i]=(Math.cbrt(a)**pot)/b;
    var str = '(&#8731;' +a+')<sup>'+pot+'</sup>';
  }
  var text = start_frac() + create_custom_frac(str,b,sinal);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  if (dif==1){
    calc2[i]=(Math.sqrt(a)/b)**pot;
    text += create_custom_frac_pot('&#8730;'+a,b,pot,sinal);
  }
  else {
    calc2[i]=(Math.cbrt(a)/b)**pot;
    text += create_custom_frac_pot('&#8731;'+a,b,pot,sinal);
  }
  text += end_frac();
  document.getElementById("enunciado"+i).innerHTML = text;
}

function create_enun_frac3(i,a,b){
  var dif = Math.floor((Math.random() *2) + 1);
  var pot = Math.floor((Math.random() *3) + 1);
  var text = start_frac() + create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  if (dif==1) {
    calc2[i]=(Math.cbrt(a**pot)/b)**3;
    text += create_custom_frac_pot('&#8731;'+a**pot,b,3,0);
  }
  else {
    calc2[i]=(Math.sqrt(a**pot)/b)**2;
    text += create_custom_frac_pot('&#8730;'+a**pot,b,2,0);
  }
  text += end_frac();
  document.getElementById("enunciado"+i).innerHTML = text;
}

funcs[2][0][5] = function (){
  titulo(2,5,0);
  submete=6;
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = [-1,-1,-1,-1];
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    make_radios(i);
    var neg = Math.floor((Math.random() *2) + 1);
    var a = Math.floor((Math.random() *8) + 2);
    var b = Math.floor((Math.random() *8) + 2);
    if(a<b){
      var aux = a;
      a=b;
      b=aux;
    }else if(a==b){
      a+=2;
    }
    if (neg==1) a=-a;
    var dif = Math.floor((Math.random() *4) + 1);
    if(dif==1) create_enun_fracVSuni(i,a,b);
    else if(dif==2) create_enun_frac2(i,a,b);
    else if(dif==3) create_enun_frac3(i,a,b);
    else if(dif==4) create_enun_frac1(i,a,b);
    console.log(calc1[i],"  -  ",calc2[i]);
  }
}
