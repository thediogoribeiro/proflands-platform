

funcs[2][0][3] = function (){
  titulo(2,3,0);
  submete=5;
  pagina = 0;
  hide("materia");
  show("quizzes");
  // var  des = [8,8,8,8,8,8,8,8,8,8];
  //var  des = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var canvas = '<canvas id="canvas' + i + '"  width="' + larg_canvas + '" height="'+ alt_canvas + '"></canvas>';
    var enunciado = document.getElementById("enunciado"+i);
    var flag=1;
    while(flag==1){
      var final = start_frac();
      var res = 0;
      var dif = Math.floor(Math.random() * 2) + 1;
      var des = Math.floor(Math.random() * 11) + 3;
      if (dif==1){
        var neg = Math.floor(Math.random() * 2) + 1;
        var num = Math.floor(Math.random() * 20) + 3;
        if(neg==1) num=-num;
        var denum = Math.floor(Math.random() * 3) + 1;
        if ((num/denum)%1==0){
          var str = num/denum;
        }else if(denum!=1){
          var str = create_frac(num,denum);
        }else{
          var str = num;
        }
        final = str;
        res=(num/denum);
      }else{
        var n = Math.floor(Math.random() * 3) + 2;
        for(var j = 0;j<n;j++){
          var sinal = Math.floor(Math.random() * 2) + 1;
          if (sinal==1) var op=(j==0)?(""):('<div id="cell2" class="divTableCelle">&nbsp; + &nbsp;</div>');
          else var op='<div id="cell2" class="divTableCelle">&nbsp; - &nbsp;</div>';
          var str = op;
          var neg = Math.floor(Math.random() * 2) + 1;
          var num = Math.floor(Math.random() * 20) + 3;
          if(neg==1) num=-num;
          var denum = Math.floor(Math.random() * 3) + 1;
          if ((num/denum)%1==0){
            str +=(neg==1)?('<div class="divTableCelle">&nbsp;('+num/denum+')&nbsp;</div>'):('<div class="divTableCelle">&nbsp;'+num/denum+'&nbsp;</div>') ;
          }else if(denum!=1){
            str += create_frac(num,denum);
          }else{
            str += (neg==1)?('<div class="divTableCelle">&nbsp;('+num+')&nbsp;</div>'):('<div class="divTableCelle">&nbsp;'+num/denum+'&nbsp;</div>');
          }
          if(sinal==1) res += (num/denum);
          else res-=(num/denum);
          final += str;
        }
      }
      var dec = Math.abs(Math.round((res%1)*10));
      if(dec==5 || dec==3 || dec==0 || dec==7) flag=3;
    }
    final += end_frac();
    console.log("pagina: ", i+1, "; Solucao: ",res)
    enunciado.innerHTML += "Escolhe na reta númerica o valor:<br> " + final + "<br>" + canvas ;
    create_reta_num(i,res,des);
    clear_radio(i);
  }
}
