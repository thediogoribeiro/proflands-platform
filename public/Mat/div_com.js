const valor_min_mdc = 50;
const valor_max_mdc = 200;
const valor_min_mmc = 5;
const valor_max_mmc = 75;
const variacao_mdc = 50;
const variacao_mmc = 20;

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcm_two_numbers(x, y) {
  return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function sol_errada_div_com(sol,num1,num2,num3){
  var val_max = 4;
  while(num1==num2 || num1==num3 || num2==num3 || num1==sol || num2==sol || num3==sol || num1==0 || num2==0 || num3==0){
    num1 = Math.floor(Math.random() * val_max) + 1;
    num2 = Math.floor(Math.random() * val_max) + 1;
    num3 = Math.floor(Math.random() * val_max) + 1;
    neg1 = Math.floor(Math.random() * 2) + 1;
    if (neg1==1) num1 = -num1;
    neg2 = Math.floor(Math.random() * 2) + 1;
    if (neg2==1) num2 = -num2;
    neg3 = Math.floor(Math.random() * 2) + 1;
    if (neg3==1) num3 = -num3;
    num1 = Math.abs(num1+sol);
    num2 = Math.abs(num2+sol);
    num3 = Math.abs(num3+sol);
  }
  return [num1,num2,num3];
}

function random_div_com(intervaloMax,intervaloMin,n){
  while(n%10==7){
    n=Math.floor(Math.random() * intervaloMax) + intervaloMin;
  }
  return n;
}

funcs[0][3] = function create_divisores(){
  titulo(0,3);
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var max_min = Math.floor(Math.random() * 2) + 1;
    if (max_min==1) {
      var gcd1 = random_div_com(valor_max_mdc,valor_min_mdc,7);
      var gcd2 = random_div_com(variacao_mdc,gcd1,7);
      if (gcd2<0) gcd2 = Math.abs(gcd2);
      document.getElementById("enunciado"+i).innerHTML = 'm.d.c('+gcd1+', '+gcd2+')' ;
      var sol = gcd_two_numbers(gcd1,gcd2);
    }
    else {
      var lcm1 = random_div_com(valor_max_mmc,valor_min_mmc,7);
      var lcm2 = random_div_com(variacao_mmc,lcm1,7);
      if (lcm2<0) lcm2 = Math.abs(lcm2);
      document.getElementById("enunciado"+i).innerHTML = 'm.m.c('+lcm1+', '+lcm2+')' ;
      var sol = lcm_two_numbers(lcm1,lcm2);
    }
    var sol_nova = sol_errada_div_com(sol,0,0,0);
    write_solutions(i,(sol_nova[0]==1) ? ('Impossivel') : (sol_nova[0]),(sol_nova[1]==1) ? ('Impossivel') : (sol_nova[1]),(sol_nova[2]==1) ? ('Impossivel') : (sol_nova[2]),(sol==1) ? ('Impossivel') : (sol));
  }
}
