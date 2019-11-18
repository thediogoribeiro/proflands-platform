const script = require('./../../script');
function randomAnswer(n){
  var s = new Array(4);
  s[3]=n;
  while(s[0]==s[1] || s[0]==s[2] || s[0]==s[3] || s[1]==[2] || s[1]==s[3] || s[2]==s[3]){
    s[0] = script.variacao(n, 5);
    s[1] = script.variacao(n, 5);
    s[2] = script.variacao(n, 5);
  }
  return s;
}

module.exports = {
  f : function(){
    var sol = new Array(4);
    var num, dif;
    num = Math.floor(Math.random() * 20) + 3;
    dif = Math.floor(Math.random() * 2) + 1;
    q = (dif==1)?('&#8730;' + (num**2)):('&#8731;' + (num**3)) ;
    sol =randomAnswer(num);
    var sc = sol[3];
    var s = new Array(4);
    for(var i = 0; i<4 ; i++){
      var rand = Math.floor(Math.random() * (4-i));
      s[i] = sol[rand];
      sol.splice(rand, 1);
    }
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s[0]+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s[1]+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s[2]+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s[3]+'</label><br>';
    return {q:q, cs:cs, solution:sc}
  }
};
