var nums = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var corrs = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

function create_decimal(){
  var num = Math.round(((Math.random() * 20) + 1) * 100) / 100;
  var decimal = num%0.1;
  decimal = Math.round(decimal * 100);
  if (decimal==0 || decimal==10) num+=0.01;
  return Math.round(num * 100) / 100;
}

function ver_arredondado(i){
  var corr = corrs[i];
  var checkedValue = "";
  var inputElements = document.getElementsByName('solucao'+i);
  for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
          checkedValue = inputElements[i].value;
          break;
        }
  }
  var decimal = nums[i]%1;
  decimal = Math.round(decimal * 10);
  if (decimal>4 && checkedValue==corr+" Arredondado por excesso") return true;
  else if(decimal< 5 && checkedValue==corr+" Arredondado por defeito") return true;
}

funcs[1][5] = function (){
  titulo(1,5);
  pagina = 0;
  submete=4;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var num = create_decimal();
    var num2 = create_decimal();
    var dif = Math.floor(Math.random() * 2) + 1;
    if(dif==1){
      nums[i]=num;
      var top = (Math.floor(num * 10) / 10)+0.1;
      top = Math.floor(top * 10) / 10;
      var bot = Math.floor(num * 10) / 10;
      var corr = Math.round(num * 10) / 10;
      corrs[i] = corr;
      document.getElementById("enunciado"+i).innerHTML = num;
    }else{
      var mult_final = Math.round((num*num2) * 100) / 100
      nums[i]=mult_final;
      var top = (Math.floor(mult_final * 10) / 10)+0.1;
      top = Math.floor(top * 10) / 10;
      var bot = Math.floor(mult_final * 10) / 10;
      var corr = Math.round(mult_final * 10) / 10;
      corrs[i] = mult_final;
      document.getElementById("enunciado"+i).innerHTML = num + ' &times; ' + num2;
    }
    document.getElementById("r0"+i).value = top+" Arredondado por excesso";
    document.getElementById("r1"+i).value = top+" Arredondado por defeito";
    document.getElementById("r2"+i).value = bot+" Arredondado por excesso";
    document.getElementById("r3"+i).value = bot+" Arredondado por defeito";
    write_solutions(i,top+" Arredondado por excesso",top+" Arredondado por defeito",bot+" Arredondado por excesso",bot+" Arredondado por defeito");
    }
}
