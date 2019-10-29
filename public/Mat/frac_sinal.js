



funcs[2][0][4] = function (){
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    titulo(2,4,0);
    cria_pag(i);
    var num1 = Math.floor(Math.random() * intervalo_frac) + 1;
    var denum1 = Math.floor(Math.random() * intervalo_frac) + 1;
    var num2 = Math.floor(Math.random() * intervalo_frac) + 1;
    var denum2 = Math.floor(Math.random() * intervalo_frac) + 1;
  	var op = Math.floor(Math.random() * 4) + 1;
    var sinal1 = Math.floor(Math.random() * 2) + 1;
    var sinal2 = Math.floor(Math.random() * 2) + 1;
    if (sinal1==1)num1=-num1;
    if (sinal2==1)num2=-num2;
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
