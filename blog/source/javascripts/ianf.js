var ICF = {};

ICF.Iconizer = function() {

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

ICF.disqus = (function(){

  // Awesome feature detection. If they don't have a modern browser just load it.

  var $elem = document.getElementById("disqus_thread"),
      supports = !!(document.addEventListener && document.body.getBoundingClientRect);

  if (!$elem) return;
  if (!supports) return loadComments();

  var $commentLink = document.getElementById("js-comment-link"),
      enableTimer = false,
      commentsLoaded = false,

  getElementPosition = function() {
    return $elem.getBoundingClientRect().top;
  },

  getViewportHeight = function() {
    return document.documentElement.clientHeight;
  },

  loadComments = function() {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    commentsLoaded = true;
  },

  checkScroll = function() {
    if (enableTimer) clearTimeout(enableTimer);

    enableTimer = setTimeout(function() {
      return ICF.disqus.shallWeloadComments();
    }, 200);
  },

  tearDown = function() {
    document.removeEventListener('scroll', checkScroll, false);
  },

  shallWeloadComments = function() {
    if (commentsLoaded) {
      return tearDown();
    }
    if (getElementPosition() - getViewportHeight() < 500) loadComments();
  };



  // Check to see if the user has already scrolled or it's a short page.
  shallWeloadComments();

  // Set up an event listener on scroll
  document.addEventListener('scroll', checkScroll, false);
  $commentLink.addEventListener('click', loadComments, false);


  return {
    shallWeloadComments: shallWeloadComments
  };

}());

ICF.svgSprite = new ICF.Iconizer('#js-svg-sprite');

(function enableEditingInDevMode(host) {

  if (!host.match(/(127|localhost)/)) return;

  var btn = document.createElement("button");
  btn.innerText = "Toggle contenteditable";
  btn.setAttribute("style", "position: absolute; top: 20px; left: 20px;");

  btn.addEventListener("click", function(e) {
    var state = !!!document.body.getAttribute("contenteditable");
    document.body.setAttribute("contenteditable", state);
  }, false);

  document.body.appendChild(btn);

}(window.location.hostname));
