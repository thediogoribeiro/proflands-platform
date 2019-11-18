//import { format } from "path";

//variaveis
const intervalo_frac = 99;// 1 ate X
const intervalo_variacao = 50; //-25 ate 25
const script = require('./../../script');
const gcd = require('./../gcd-lcm');
const aux = require('./../fracoes');



function mult(a,b,x,y){
  var topm = a * x;
  var botm = b * y;
  var divisor = gcd.gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function div(a,b,x,y){
  var topm = a * y;
  var botm = b * x;
  var divisor = gcd.gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function add(a,b,x,y){
  var topm = a * y + b * x;
  var botm = b * y;
  var divisor = gcd.gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function sub(a,b,x,y){
  var topm = a * y - b * x;
  var botm = b * y;
  var divisor = gcd.gcd(topm, botm);
  topm = topm / divisor;
  botm = botm / divisor;
  var res = [topm,botm];
  return res
}

function frac_aleatoria(res){
  var sinal = 0;
  var var1 = script.variacao(res[0], intervalo_variacao);
  var var2 = script.variacao(res[1], intervalo_variacao);
  return aux.start_frac()+aux.create_frac(var1,var2)+aux.end_frac();
}


module.exports = {
  f : function(i){
    var num1, num2, denum1, denum2, op, opStr, resok;
    num1 = Math.floor(Math.random() * intervalo_frac) + 1;
    denum1 = Math.floor(Math.random() * intervalo_frac) + 1;
    num2 = Math.floor(Math.random() * intervalo_frac) + 1;
    denum2 = Math.floor(Math.random() * intervalo_frac) + 1;
    op = Math.floor(Math.random() * 4) + 1;
    if (op == 1) {
      opStr = '&nbsp;<div id="cell2" class="divTableCell"> + </div>&nbsp;';
      resok = add(num1,denum1,num2,denum2);
    } else if(op == 2) {
      opStr = '&nbsp;<div id="cell2" class="divTableCell"> - </div>&nbsp;';
      resok = sub(num1,denum1,num2,denum2);
    }else if(op == 3) {
      opStr = '&nbsp;<div id="cell2" class="divTableCell"> &times; </div>&nbsp;';
      resok = mult(num1,denum1,num2,denum2);
    }else if(op == 4) {
      opStr = '&nbsp;<div id="cell2" class="divTableCell"> / </div>&nbsp;';
      resok = div(num1,denum1,num2,denum2);
    }
    var q = aux.start_frac()+aux.create_frac(num1,denum1)+opStr+aux.create_frac(num2,denum2)+aux.end_frac();
    var s1 = frac_aleatoria(resok);
    var s2 = frac_aleatoria(resok);
    var s3 = frac_aleatoria(resok);
    var s4 = frac_aleatoria(resok);
    var s5 = aux.start_frac()+aux.create_frac(resok[0],resok[1])+aux.end_frac();
    var rand = Math.floor(Math.random() * 4) + 1;
    if(rand==1){s1=s5}
    else if(rand==2){s2=s5}
    else if(rand==3){s3=s5}
    else if(rand==4){s4=s5}
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s1+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s2+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s3+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s4+'</label><br>';
    return {q:q, cs:cs, solution:s5}
  }
};
