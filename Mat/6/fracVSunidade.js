


module.exports = {
  f : function(){
    var a, b, sc;
    a = Math.floor((Math.random() *8) + 2);
    b = Math.floor((Math.random() *8) + 2);
    if ((a/b)>Math.round(a/b)) sc=">";
    else if ((a/b)<Math.round(a/b)) sc="<";
    else if ((a/b)==Math.round(a/b)) sc="=";
    q = {a:a,b:b};
    return {q:q, s1:0, s2:0, s3:0, s4:0, solution:sc}
  }
};
