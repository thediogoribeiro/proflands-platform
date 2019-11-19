var calc1 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var calc2 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var esq, dir;
const f = require('./../fracoes');

function create_enun_frac1(i,a,b,pot){
  if (a<0) var sinal = 1;
  esq=(a/b)**pot;
  var text = f.start_frac() + f.create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  dir = ((a**pot)/b);
  text += f.create_custom_frac(a+'<sup>'+pot+'</sup>',b,sinal);
  text += f.end_frac();
  return  text;
}

function create_enun_fracVSuni(i,a,b,pot){
  esq=(a/b)**pot;
  var text = f.start_frac() + f.create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  dir=(Math.round(a**pot/b**pot));
  text += '<div class="divTableCell">' + (Math.round(a**pot/b**pot))+ '</div>';
  text += f.end_frac();
  return  text;
}

function create_enun_frac2(i,a,b,dif,pot){
  if (a<0) var sinal = 1;
  a = Math.abs(a);
  if (dif==1) {
    esq=(Math.sqrt(a)**pot)/b;
    var str = '(&#8730;' +a+')<sup>'+pot+'</sup>';
  }else{
    esq=(Math.cbrt(a)**pot)/b;
    var str = '(&#8731;' +a+')<sup>'+pot+'</sup>';
  }
  var text = f.start_frac() + f.create_custom_frac(str,b,sinal);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  if (dif==1){
    dir=(Math.sqrt(a)/b)**pot;
    text += f.create_custom_frac_pot('&#8730;'+a,b,pot,sinal);
  }else{
    dir=(Math.cbrt(a)/b)**pot;
    text += f.create_custom_frac_pot('&#8731;'+a,b,pot,sinal);
  }
  text += f.end_frac();
  return text;
}

function create_enun_frac3(i,a,b,dif,pot){
  // com a neg dá erro a fazer -> sqrt(a)
  //console.log(" -   ",i,a,b,dif,pot);
  esq=(a/b)**pot;
  var text = f.start_frac() + f.create_frac_pot(a,b,pot);
  text += '<div id="cell2' + i + '" class="divTableCell">&nbsp;?&nbsp;</div>';
  if (dif==1) {
    dir=(Math.cbrt(a**pot)/b)**3;
    text += f.create_custom_frac_pot('&#8731;'+a**pot,b,3,0);
  }else {
    dir=(Math.sqrt(a**pot)/b)**2;
    text += f.create_custom_frac_pot('&#8730;'+a**pot,b,2,0);
  }
  text += f.end_frac();
  return text;
}

module.exports = {
  f : function(i){
  var sol = [-1,-1,-1,-1];
  var neg, a, b, dif, q, s;
      neg = Math.floor((Math.random() *2) + 1);
      a = Math.floor((Math.random() *8) + 2);
      b = Math.floor((Math.random() *8) + 2);
      dif = Math.floor((Math.random() *4) + 1);
      dif_enun = Math.floor((Math.random() *2) + 1);
      pot_enun = Math.floor((Math.random() *3) + 1);
    if(a<b){
      var aux = a;
      a=b;
      b=aux;
    }else if(a==b){
      a+=2;
    }
    if (neg==1) a=-a;
    if(dif==1) q = create_enun_fracVSuni(i,a,b,pot_enun);
    else if(dif==2) q = create_enun_frac2(i,a,b,dif_enun,pot_enun);
    else if(dif==3) q = create_enun_frac3(i,a,b,dif_enun,pot_enun);
    else if(dif==4) q = create_enun_frac1(i,a,b,pot_enun);
    if (esq>dir) s="&gt;";
    else if (esq<dir) s="&lt;";
    else if (esq==dir) s="=";
    else console.log("Algo errado em maior menor");
    //console.log(esq," ",s," ",dir," --- ",dif);
    var str='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0" onclick="change_radio(this,'+i+')"><label id="label0'+i+'">&lt;</label><br>';
    str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1" onclick="change_radio(this,'+i+')"><label id="label1'+i+'">&gt;</label><br>';
    str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2" onclick="change_radio(this,'+i+')"><label id="label2'+i+'">=</label><br>';
    return {q:q, cs:str, solution:s}
  }
};
