
funcs[2][0][2] = function (){
  titulo(2,2,0);
  pagina = 0;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    num = Math.floor(Math.random() * 20) + 3;
    var dif = Math.floor(Math.random() * 2) + 1;
    document.getElementById("enunciado"+i).innerHTML += (dif==1)?('&#8730;' + (num**2)):('&#8731;' + (num**3)) ;
    write_solutions(i,num+4,num+2,num-2,num);
  }
}
