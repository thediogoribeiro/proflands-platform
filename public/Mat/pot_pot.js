


funcs[2][0][1] = function (){
  titulo(2,1,0);
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var sinal_mult1=2;
    var sinal_sum1=2;
    var sinal_mult2=2;
    var sinal_sum2=2;
    var num1 = Math.floor(Math.random() * 9) + 1;
    var denum1 = Math.floor(Math.random() * 9) + 2;
    var num2 = Math.floor(Math.random() * 9) + 1;
    var denum2 = Math.floor(Math.random() * 9) + 2;
    var n1 = Math.floor(Math.random() * 5) + 2;
    var m1 = Math.floor(Math.random() * 5) + 2;
    var n2 = Math.floor(Math.random() * 5) + 2;
    var m2 = Math.floor(Math.random() * 5) + 2;
    var dif = Math.floor(Math.random() * 2) + 1;
    var sinal1 = Math.floor(Math.random() * 2) + 1;
    var sinal2 = Math.floor(Math.random() * 2) + 1;
    if (sinal1==1)num1=-num1;
    if (sinal2==1)num2=-num2;
    var op_mult = '<div id="cell2" class="divTableCell">&nbsp;&times;&nbsp;</div>';
    if(dif==1){
      document.getElementById("enunciado"+i).innerHTML += start_frac() + create_frac_pot_pot(num1,denum1,n1,m1) + end_frac() + '<br>';
      if (n1*m1%2==0 || n1+m1%2==0) num1=Math.abs(num1);
      var a = start_frac() + create_frac_pot(num1,denum1,n1+m1) + end_frac();
      var b = start_frac() + create_frac_pot(denum1,num1,n1*m1) + end_frac();
      var c = start_frac() + create_frac_pot(denum1,num1,n1+m1) + end_frac();
      var d = start_frac() + create_frac_pot(num1,denum1,n1*m1) + end_frac();
    }else{
      document.getElementById("enunciado"+i).innerHTML += start_frac() + create_frac_pot_pot(num1,denum1,n1,m1) + op_mult + create_frac_pot_pot(num2,denum2,n2,m2) + end_frac() + '<br>';
      if (n1*m1%2==0 || n1+m1%2==0) num1=Math.abs(num1);
      if (n2*m2%2==0 || n2+m2%2==0) num1=Math.abs(num2);
      var a = start_frac() + create_frac_pot(num1,denum1,n1+m1) + op_mult + create_frac_pot(num2,denum2,n2+m2) + end_frac();
      var b = start_frac() + create_frac_pot(denum1,num1,n1*m1) + op_mult + create_frac_pot(denum2,num2,n2*m2) + end_frac();
      var c = start_frac() + create_frac_pot(denum1,num1,n1+m1) + op_mult + create_frac_pot(denum2,num2,n2+m2) + end_frac();
      var d = start_frac() + create_frac_pot(num1,denum1,n1*m1) + op_mult + create_frac_pot(num2,denum2,n2*m2) + end_frac();
    }
    write_solutions(i,a,b,c,d);
  }
}
