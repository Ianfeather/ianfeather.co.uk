var Iconizer;
Iconizer = function() {
  
  function weSupportSvg(){
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    if ((div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg') {
      document.documentElement.className += ' svg';
      return true;
    } else {
      return false;
    }
  }
  
  
  function Iconizer(elem) {
    
    if (weSupportSvg()) {
      var head, style, svgs, css, serializer, svg, id, image, x, len;
      head = document.getElementsByTagName("head")[0];
      style = document.createElement("style");
      style.type = "text/css";
      style.className = "svg-css-injection";
      svgs = document.querySelectorAll(elem);
      css = "";
      serializer = new XMLSerializer();
      for (x = 0, len = svgs.length; x < len; x++) {
        svg = svgs[x];
        id = svg.getAttribute("data-classname");
        image = escape(serializer.serializeToString(svg.querySelectorAll('svg')[0]));
        css += "." + id + "{ background-image: url('data:image/svg+xml;utf8," + image + "') } \n";
      }
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
      return;
    } else {
      return false;
    }
  }
  return Iconizer;
}();

var svgSprite = new Iconizer('#js-svg-sprite');