
var sol = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
function create_table(k,num1,denum1,num2,denum2){
  var text = '<div><table id="tabela_cores' + k + '" style="width:500px; height:500px" >';
  for(var i = 0; i < denum1; i++){
    text += "<tr>";
    for(var j = 0; j < denum2; j++){
      text += '<td id="' + i + ':' + j + '" onclick="changeColor(this)"></td>';
    }
    text += "</tr>";
  }
  text += '</table></div>';
  document.getElementById("enunciado"+k).innerHTML += text;
  return num1*num2;
}

function changeColor(td){
  td.style.backgroundColor=(td.style.backgroundColor==cor)?('transparent'):(cor);
}

function conta_tabela(i){
  var table = document.getElementById("tabela_cores" + i);
  var n_cells = table.rows[0].cells;
  var selct_cells = 0;
  for (j = 0; j< table.rows.length; j++){
    for (var i = 0; i < table.rows[j].cells.length; i++){
     if(table.rows[j].cells[i].style.backgroundColor==cor)selct_cells++;
    }
  }
  return selct_cells;
}

funcs[1][3] = function (){
  titulo(1,3);
  pagina = 0;
  submete = 1;
  hide("materia");
  show("quizzes");
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var num1 = Math.floor(Math.random() * 9) + 1;
    var denum1 = Math.floor(Math.random() * (10-num1)) + (num1+1);
    var num2 = Math.floor(Math.random() * 9) + 1;
    var denum2 = Math.floor(Math.random() * (10-num2)) + (num2+1);
    var op = '<div id="cell2" class="divTableCell"> &times; </div>';
    document.getElementById("enunciado"+i).innerHTML = start_frac() + create_frac(num1,denum1) + op + create_frac(num2,denum2) + end_frac();
    sol[i] = create_table(i,num1,denum1,num2,denum2);
    clear_radio(i);
  }
}
