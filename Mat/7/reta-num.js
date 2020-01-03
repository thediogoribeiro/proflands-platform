const f = require('./../fracoes');
const OFF = 298723423;

module.exports = {
  f : function(i){
    var num, des, denum, neg, dif, sinal, res, n;
    var flag=1;
    while(flag==1){
      var final = f.start_frac();
      res = 0;
      dif = Math.floor(Math.random() * 2) + 1;
      des = Math.floor(Math.random() * 11) + 3;
      denum = Math.floor(Math.random() * 3) + 1;
      neg = Math.floor(Math.random() * 2) + 1;
      num = Math.floor(Math.random() * 20) + 3;
      sinal = Math.floor(Math.random() * 2) + 1;
      n = Math.floor(Math.random() * 3) + 2;
      // num=13;
      // denum=3;
      // des=8;
      if (dif==1){
        if(neg==1) num=-num;
        if ((num/denum)%1==0){  var str = num/denum;
        }else if(denum!=1){     var str = f.create_frac(num,denum);
        }else{                  var str = num;}
        final += str;
        res=(num/denum);
      }else{
        for(var j = 0;j<n;j++){
          var str;
          if (sinal==1) str=(j==0)?(""):('<div class="divTableCelle">+</div>');
          else str='<div class="divTableCelle">-</div>';
          if(neg==1) num=-num;
          if ((num/denum)%1==0){
            str +=(neg==1)?('<div class="divTableCelle">&nbsp;('+num/denum+')&nbsp;</div>'):('<div class="divTableCelle">&nbsp;'+num/denum+'&nbsp;</div>') ;
          }else if(denum!=1){
            str += f.create_frac(num,denum);
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
    final += f.end_frac();
    q = 'Escolhe na reta númerica o valor: ' + final;
    var cs = '<br><canvas id="canvas' + i + '"  width="400" height="400"></canvas>';
    return {q:q, solution:res, cs:cs, exec:'create_reta_num('+i+','+res+','+des+')'}
  }
}
