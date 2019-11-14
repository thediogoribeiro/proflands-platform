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
    return {q:q, s1:s[0], s2:s[1], s3:s[2], s4:s[3], solution:sc}
  }
};
