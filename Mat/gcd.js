module.exports = {
  gcd : function go(a,b) {
    if (b == 0) return a;
    else return go(b, a % b);
  }
};
