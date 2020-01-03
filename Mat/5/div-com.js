const valor_min_mdc = 50;
const valor_max_mdc = 200;
const valor_min_mmc = 5;
const valor_max_mmc = 75;
const variacao_mdc = 50;
const variacao_mmc = 20;
const gl = require('./../gcd-lcm');

function sol_errada_div_com(sol){
  var val_max = 4;
  while(num1==num2 || num1==num3 || num1==num4 || num2==num3 || num2==num4 || num3==num4 || num1==sol || num2==sol || num3==sol || num4==sol || num1==0 || num2==0 || num3==0 || num4==0){
    var num1 = Math.floor(Math.random() * val_max) + 1;
    var num2 = Math.floor(Math.random() * val_max) + 1;
    var num3 = Math.floor(Math.random() * val_max) + 1;
    var num4 = Math.floor(Math.random() * val_max) + 1;
    var neg1 = Math.floor(Math.random() * 2) + 1;
    if (neg1==1) num1 = -num1;
    var neg2 = Math.floor(Math.random() * 2) + 1;
    if (neg2==1) num2 = -num2;
    var neg3 = Math.floor(Math.random() * 2) + 1;
    if (neg3==1) num3 = -num3;
    var neg4 = Math.floor(Math.random() * 2) + 1;
    if (neg4==1) num4 = -num4;
    num1 = Math.abs(num1+sol);
    num2 = Math.abs(num2+sol);
    num3 = Math.abs(num3+sol);
    num4 = Math.abs(num4+sol);
  }
  return [num1,num2,num3,num4];
}

function random_div_com(intervaloMax,intervaloMin,n){
  while(n%10==7){
    n=Math.floor(Math.random() * intervaloMax) + intervaloMin;
  }
  return n;
}

module.exports = {
  f : function(i){
    var gcdORlcm, gcd1, gcd2, lcm1, lcm2;
    gcdORlcm = Math.floor(Math.random() * 2) + 1;
    if (gcdORlcm==1) {
      gcd1 = random_div_com(valor_max_mdc,valor_min_mdc,7);
      gcd2 = random_div_com(variacao_mdc,gcd1,7);
      if (gcd2<0) gcd2 = Math.abs(gcd2);
      q = 'm.d.c('+gcd1+', '+gcd2+')' ;
      var sol = gl.gcd(gcd1,gcd2);
    }else{
      lcm1 = random_div_com(valor_max_mmc,valor_min_mmc,7);
      lcm2 = random_div_com(variacao_mmc,lcm1,7);
      if (lcm2<0) lcm2 = Math.abs(lcm2);
      q = 'm.m.c('+lcm1+', '+lcm2+')' ;
      var sol = gl.lcm(lcm1,lcm2);
    }
    var sol_nova = sol_errada_div_com(sol);
    var s1 = (sol_nova[0]==1) ? ('Impossivel') : (sol_nova[0])
    var s2 = (sol_nova[1]==1) ? ('Impossivel') : (sol_nova[1])
    var s3 = (sol_nova[2]==1) ? ('Impossivel') : (sol_nova[2])
    var s4 = (sol_nova[3]==1) ? ('Impossivel') : (sol_nova[3])
    var s5 = (sol==1)?('Impossivel'):(sol);
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
