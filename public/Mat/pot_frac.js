

funcs[1][4] = function (){
  titulo(1,4);
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var num1 = Math.floor(Math.random() * 9) + 1;
    var denum1 = Math.floor(Math.random() * 9) + 2;
    var num2 = Math.floor(Math.random() * 9) + 1;
    var denum2 = Math.floor(Math.random() * 9) + 2;
    var n = Math.floor(Math.random() * 5) + 2;
    var m = Math.floor(Math.random() * 5) + 2;
    var dif = Math.floor(Math.random() * 2) + 1;
    var frac1 = create_frac(num1,denum1);
    var frac2 = create_frac(num2,denum2);
    var op_mult = '<div id="cell2" class="divTableCell">&nbsp;&times;&nbsp;</div>'
    start_frac();
    if(dif==1){
      for(var j = 0; j<n; j++){
        document.getElementById("enunciado"+i).innerHTML += (j==0)?(""+ frac1):(op_mult+ frac1) ;
      }
      end_frac();
      var a = start_frac() + create_frac((num1*n),denum1)+ end_frac() ;
      var b = start_frac() + create_frac_pot((num1*n),denum1,n)+ end_frac() ;
      var c = start_frac() + create_frac_pot((num1+num1),denum1,n)+ end_frac() ;
      var d = start_frac() + create_frac_pot(num1,denum1,n)+ end_frac();
    }else{
      for(var j = 0; j<n; j++){
        document.getElementById("enunciado"+i).innerHTML += (j==0)?(""+ frac1):(op_mult+ frac1) ;
      }
      for(var j = 0; j<m; j++){
        document.getElementById("enunciado"+i).innerHTML += op_mult + frac2;
      }
      end_frac();
      var a = start_frac() + create_frac((num1*n),denum1)+op_mult+create_frac((num2*m),denum2)+ end_frac();
      var b = start_frac() + create_frac_pot((num1*n),denum1,n)+op_mult+create_frac_pot((num2*m),denum2,m)+ end_frac();
      var c = start_frac() + create_frac_pot((num1+num1),denum1,n)+op_mult+create_frac_pot((num2+num2),denum2,m)+ end_frac();
      var d = start_frac() + create_frac_pot(num1,denum1,n)+op_mult+create_frac_pot(num2,denum2,m)+ end_frac();
    }
    write_solutions(i,a,b,c,d);
  }
}
