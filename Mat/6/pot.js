

const f = require('./../fracoes');
var q ="";

function create_pot_enunciado(i, a, b, c, op, tipo){
  var final = [-1,-1,-1,-1];
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
  q = text;
  final = create_pot_err(a,b,c,operador,igual);
  final[3] = create_pot_corr(a,b,c,operador,igual);
  return final;
}

function create_pot_corr(a,b,c,operador,igual){
  if(operador==" &times; " && igual=="baixo")var sol = a +'<sup>' + (b+c) +'</sup>';
  if(operador==" &times; " && igual=="cima")var sol = (b*c) +'<sup>' + a +'</sup>';
  if(operador==" / " && igual=="cima")var sol = (b==c)?('1<sup>' + a +'</sup>'):(f.start_frac() + f.create_frac_pot(b,c,a) + f.end_frac());
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
    sol[1] = (b==c)?('1<sup>1</sup>'):(f.start_frac() + f.create_frac_pot(b,c,1) + f.end_frac());
    sol[2] = (b==c)?('1<sup>0</sup>'):(f.start_frac() + f.create_frac_pot(b,c,0) + f.end_frac());
  }
  if(operador==" / " && igual=="baixo"){
    sol[0] = '1<sup>' + (b-c) +'</sup>';
    sol[1] = '0<sup>' + (b-c) +'</sup>';
    sol[2] = a + '<sup>('+ b + '/' + c + ')</sup>';
  }
  return sol;
}

module.exports = {
  f : function(){
    var s = new Array(4);
    var a,b,c,op,tipo;
    a = Math.floor((Math.random() *8) + 2);
    b = Math.floor((Math.random() *8) + 2);
    c = Math.floor((Math.random() *8) + 2);
    op = Math.floor((Math.random() *2) + 1);
    tipo = Math.floor((Math.random() *2) + 1);
    sol = create_pot_enunciado(i, a, b, c, op, tipo);
    var sc = sol[3];
    for(var i = 0; i<4 ; i++){
      var rand = Math.floor(Math.random() * (4-i));
      s[i] = sol[rand];
      sol.splice(rand, 1);
    }
    return {q:q, s1:s[0], s2:s[1], s3:s[2], s4:s[3], solution:sc}
  }
};
