
//variaveis
const intervalo_frac = 99;// 1 ate X
const intervalo_variacao = 50; //-25 ate 25
const script = require('./../../script');
const f = require('./../fracoes');

function frac_aleatoria(res){
  var sinal = 0;
  var var1 = script.variacao(res[0], intervalo_variacao);
  var var2 = script.variacao(res[1], intervalo_variacao);
  return f.start_frac()+f.create_frac(var1,var2)+f.end_frac();
}

module.exports = {
  f : function(i){
    var num1, num2, denum1, denum2, op, operador, sinal1, sinal2, resok;
    var sol = [-1,-1,-1,-1];
    num1 = Math.floor(Math.random() * intervalo_frac) + 1;
    denum1 = Math.floor(Math.random() * intervalo_frac) + 1;
    num2 = Math.floor(Math.random() * intervalo_frac) + 1;
    denum2 = Math.floor(Math.random() * intervalo_frac) + 1;
    op = Math.floor(Math.random() * 4) + 1;
    sinal1 = Math.floor(Math.random() * 2) + 1;
    sinal2 = Math.floor(Math.random() * 2) + 1;
    if (sinal1==1)num1=-num1;
    if (sinal2==1)num2=-num2;
    if (op == 1) {
      operador = '&nbsp;<div id="cell2" class="divTableCell"> + </div>&nbsp;';
      resok = f.add(num1,denum1,num2,denum2);
    } else if(op == 2) {
      operador = '&nbsp;<div id="cell2" class="divTableCell"> - </div>&nbsp;';
      resok =f.sub(num1,denum1,num2,denum2);
    }else if(op == 3) {
      operador = '&nbsp;<div id="cell2" class="divTableCell"> &times; </div>&nbsp;';
      resok = f.mult(num1,denum1,num2,denum2);
    }else if(op == 4) {
      operador = '&nbsp;<div id="cell2" class="divTableCell"> / </div>&nbsp;';
      resok = f.div(num1,denum1,num2,denum2);
    }
    q = f.start_frac()+f.create_frac(num1,denum1)+operador+f.create_frac(num2,denum2)+f.end_frac();
    sol[0] = frac_aleatoria(resok);
    sol[1] = frac_aleatoria(resok);
    sol[2] = frac_aleatoria(resok);
    sol[3] = f.start_frac()+f.create_frac(resok[0],resok[1])+f.end_frac();
    var sc = sol[3];
    var s = [-1,-1,-1,-1];
    for(var i = 0; i<4 ; i++){
      var rand = Math.floor(Math.random() * (4-i));
      s[i] = sol[rand];
      sol.splice(rand, 1);
    }
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s[0]+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s[1]+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s[2]+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s[3]+'</label><br>';
    return {q:q, cs:cs, solution:sc}
  }
};
