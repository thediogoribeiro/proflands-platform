
function create_decimal(num){
  var decimal = num%0.1;
  decimal = Math.round(decimal * 100);
  if (decimal==0 || decimal==10) num+=0.01;
  return Math.round(num * 100) / 100;
}

module.exports = {
  f : function(i){
    var rand1, rand2, dif, q;
    rand1 = Math.round(((Math.random() * 20) + 1) * 100) / 100;
    rand2 = Math.round(((Math.random() * 20) + 1) * 100) / 100;
    dif = Math.floor(Math.random() * 2) + 1;
    var num = create_decimal(rand1);
    var num2 = create_decimal(rand2);
    var res = Math.round((num*num2) * 100) / 100
    if(dif==1){
      q = num;
      res = num;
    }else{
      q = num + ' &times; ' + num2;
    }
    var top = (Math.floor(res * 10) / 10)+0.1;
    top = Math.floor(top * 10) / 10;
    var bot = Math.floor(res * 10) / 10;
    var corr = Math.round(res * 10) / 10;
    if(top==corr) sc = top+" Arredondado por excesso";
    else if(bot==corr) sc = bot+" Arredondado por defeito";
    var a = top+" Arredondado por excesso";
    var b = top+" Arredondado por defeito";
    var c = bot+" Arredondado por excesso";
    var d = bot+" Arredondado por defeito";
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+a+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+b+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+c+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+d+'</label><br>';
    return {q:q, cs:cs, solution:sc}
  }
};
