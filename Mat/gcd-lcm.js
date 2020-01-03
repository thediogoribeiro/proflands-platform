function gcd(x,y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
module.exports = {
  gcd : function (x,y){
    return gcd(x,y);
  },
  lcm:function (x, y) {
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
  }
};
