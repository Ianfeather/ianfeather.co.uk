require(["b"], function(b) {
  jsResult.innerHTML += "2 "

  require(["c"], function() {
    jsResult.innerHTML += "4 "
  });

});
