

function create_pot_enunciado(i){
  var final = [-1,-1,-1,-1];
  var a = Math.floor((Math.random() *8) + 2);
  var b = Math.floor((Math.random() *8) + 2);
  var c = Math.floor((Math.random() *8) + 2);
  var op = Math.floor((Math.random() *2) + 1);
  var tipo = Math.floor((Math.random() *2) + 1);
  if (op == 1) {
    var operador = " &times; ";
  } else if(op == 2) {
    var operador = " / ";
    if(b<c){
      var aux=b;
      b=c;
      c=aux;
    }
  }
  if (tipo==1){
    var igual = "baixo"
    var text = a+'<sup>' + b +'</sup>' + operador + a+'<sup>' + c +'</sup>';
  }else {
    var igual = "cima"
    var text = b+'<sup>' +a +'</sup>' + operador + c+'<sup>' + a +'</sup>';
  }
  document.getElementById("enunciado"+i).innerHTML = text;
  final = create_pot_err(a,b,c,operador,igual);
  final[3] = create_pot_corr(a,b,c,operador,igual);
  return final;
}

function create_pot_corr(a,b,c,operador,igual){
  if(operador==" &times; " && igual=="baixo")var sol = a +'<sup>' + (b+c) +'</sup>';
  if(operador==" &times; " && igual=="cima")var sol = (b*c) +'<sup>' + a +'</sup>';
  if(operador==" / " && igual=="cima")var sol = (b==c)?('1<sup>' + a +'</sup>'):(start_frac() + create_frac_pot(b,c,a) + end_frac());
  if(operador==" / " && igual=="baixo")var sol = a+'<sup>' + (b-c) +'</sup>';
  return sol;
}

function create_pot_err(a,b,c,operador,igual){
  var sol = [-1,-1,-1,-1];
  if(operador==" &times; " && igual=="baixo"){
    sol[0] = (a*a) +'<sup>' + (b+c) +'</sup>';
    sol[1] = a +'<sup>' + (b*c) +'</sup>';
    sol[2] = (a*a) +'<sup>' + (b*c) +'</sup>';
  }
  if(operador==" &times; " && igual=="cima"){
    sol[0] = (b+c) +'<sup>' + a +'</sup>';
    sol[1] = (b*c) +'<sup>' + (a*a) +'</sup>';
    sol[2] = (b*c) +'<sup>' + (a+a) +'</sup>';
  }
  if(operador==" / " && igual=="cima"){
    sol[0] = (b-c) +'<sup>' + a +'</sup>';
    sol[1] = (b==c)?('1<sup>1</sup>'):(start_frac() + create_frac_pot(b,c,1) + end_frac());
    sol[2] = (b==c)?('1<sup>0</sup>'):(start_frac() + create_frac_pot(b,c,0) + end_frac());
  }
  if(operador==" / " && igual=="baixo"){
    sol[0] = '1<sup>' + (b-c) +'</sup>';
    sol[1] = '0<sup>' + (b-c) +'</sup>';
    sol[2] = a + '<sup>('+ b + '/' + c + ')</sup>';
  }
  return sol;
}

funcs[1][1] = function (){
  titulo(1,1);
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = [-1,-1,-1,-1]
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    sol = create_pot_enunciado(i);
    write_solutions(i,sol[0],sol[1],sol[2],sol[3]);
  }
}
