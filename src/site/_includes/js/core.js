var ICF = {};

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

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */
(function() {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
      t = self.Prism = {
      util: {
        type: function(e) {
          return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
        },
        clone: function(e) {
          var n = t.util.type(e);
          switch (n) {
          case "Object":
            var r = {};
            for (var i in e) e.hasOwnProperty(i) && (r[i] = t.util.clone(e[i]));
            return r;
          case "Array":
            return e.slice()
          }
          return e
        }
      },
      languages: {
        extend: function(e, n) {
          var r = t.util.clone(t.languages[e]);
          for (var i in n) r[i] = n[i];
          return r
        },
        insertBefore: function(e, n, r, i) {
          i = i || t.languages;
          var s = i[e],
              o = {};
          for (var u in s) if (s.hasOwnProperty(u)) {
            if (u == n) for (var a in r) r.hasOwnProperty(a) && (o[a] = r[a]);
            o[u] = s[u]
          }
          return i[e] = o
        },
        DFS: function(e, n) {
          for (var r in e) {
            n.call(e, r, e[r]);
            t.util.type(e) === "Object" && t.languages.DFS(e[r], n)
          }
        }
      },
      highlightAll: function(e, n) {
        var r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
        for (var i = 0, s; s = r[i++];) t.highlightElement(s, e === !0, n)
      },
      highlightElement: function(r, i, s) {
        var o, u, a = r;
        while (a && !e.test(a.className)) a = a.parentNode;
        if (a) {
          o = (a.className.match(e) || [, ""])[1];
          u = t.languages[o]
        }
        if (!u) return;
        r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o;
        a = r.parentNode;
        /pre/i.test(a.nodeName) && (a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
        var f = r.textContent;
        if (!f) return;
        f = f.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, " ");
        var l = {
          element: r,
          language: o,
          grammar: u,
          code: f
        };
        t.hooks.run("before-highlight", l);
        if (i && self.Worker) {
          var c = new Worker(t.filename);
          c.onmessage = function(e) {
            l.highlightedCode = n.stringify(JSON.parse(e.data));
            l.element.innerHTML = l.highlightedCode;
            s && s.call(l.element);
            t.hooks.run("after-highlight", l)
          };
          c.postMessage(JSON.stringify({
            language: l.language,
            code: l.code
          }))
        } else {
          l.highlightedCode = t.highlight(l.code, l.grammar);
          l.element.innerHTML = l.highlightedCode;
          s && s.call(r);
          t.hooks.run("after-highlight", l)
        }
      },
      highlight: function(e, r) {
        return n.stringify(t.tokenize(e, r))
      },
      tokenize: function(e, n) {
        var r = t.Token,
            i = [e],
            s = n.rest;
        if (s) {
          for (var o in s) n[o] = s[o];
          delete n.rest
        }
        e: for (var o in n) {
          if (!n.hasOwnProperty(o) || !n[o]) continue;
          var u = n[o],
              a = u.inside,
              f = !! u.lookbehind || 0;
          u = u.pattern || u;
          for (var l = 0; l < i.length; l++) {
            var c = i[l];
            if (i.length > e.length) break e;
            if (c instanceof r) continue;
            u.lastIndex = 0;
            var h = u.exec(c);
            if (h) {
              f && (f = h[1].length);
              var p = h.index - 1 + f,
                  h = h[0].slice(f),
                  d = h.length,
                  v = p + d,
                  m = c.slice(0, p + 1),
                  g = c.slice(v + 1),
                  y = [l, 1];
              m && y.push(m);
              var b = new r(o, a ? t.tokenize(h, a) : h);
              y.push(b);
              g && y.push(g);
              Array.prototype.splice.apply(i, y)
            }
          }
        }
        return i
      },
      hooks: {
        all: {},
        add: function(e, n) {
          var r = t.hooks.all;
          r[e] = r[e] || [];
          r[e].push(n)
        },
        run: function(e, n) {
          var r = t.hooks.all[e];
          if (!r || !r.length) return;
          for (var i = 0, s; s = r[i++];) s(n)
        }
      }
      },
      n = t.Token = function(e, t) {
      this.type = e;
      this.content = t
      };
  n.stringify = function(e) {
    if (typeof e == "string") return e;
    if (Object.prototype.toString.call(e) == "[object Array]") return e.map(n.stringify).join("");
    var r = {
      type: e.type,
      content: n.stringify(e.content),
      tag: "span",
      classes: ["token", e.type],
      attributes: {}
    };
    r.type == "comment" && (r.attributes.spellcheck = "true");
    t.hooks.run("wrap", r);
    var i = "";
    for (var s in r.attributes) i += s + '="' + (r.attributes[s] || "") + '"';
    return "<" + r.tag + ' class="' + r.classes.join(" ") + '" ' + i + ">" + r.content + "</" + r.tag + ">"
  };
  if (!self.document) {
    self.addEventListener("message", function(e) {
      var n = JSON.parse(e.data),
          r = n.language,
          i = n.code;
      self.postMessage(JSON.stringify(t.tokenize(i, t.languages[r])));
      self.close()
    }, !1);
    return
  }
  var r = document.getElementsByTagName("script");
  r = r[r.length - 1];
  if (r) {
    t.filename = r.src;
    document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)
  }
})();;
Prism.languages.markup = {
  comment: /&lt;!--[\w\W]*?--(&gt;|&gt;)/g,
  prolog: /&lt;\?.+?\?&gt;/,
  doctype: /&lt;!DOCTYPE.+?&gt;/,
  cdata: /&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,
  tag: {
    pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?&gt;/gi,
    inside: {
      tag: {
        pattern: /^&lt;\/?[\w:-]+/i,
        inside: {
          punctuation: /^&lt;\/?/,
          namespace: /^[\w-]+?:/
        }
      },
      "attr-value": {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          punctuation: /=|&gt;|"/g
        }
      },
      punctuation: /\/?&gt;/g,
      "attr-name": {
        pattern: /[\w:-]+/g,
        inside: {
          namespace: /^[\w-]+?:/
        }
      }
    }
  },
  entity: /&amp;#?[\da-z]{1,8};/gi
};
Prism.hooks.add("wrap", function(e) {
  e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"))
});;
Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: /@[\w-]+?(\s+[^;{]+)?(?=\s*{|\s*;)/gi,
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
  property: /(\b|\B)[a-z-]+(?=\s*:)/ig,
  string: /("|')(\\?.)*?\1/g,
  important: /\B!important\b/gi,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[\{\};:]/g
};
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
    inside: {
      tag: {
        pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
        inside: Prism.languages.markup.tag.inside
      },
      rest: Prism.languages.css
    }
  }
});;
Prism.languages.clike = {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|[^:]\/\/.*?(\r?\n|$))/g,
    lookbehind: !0
  },
  string: /("|')(\\?.)*?\1/g,
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,
  "boolean": /\b(true|false)\b/g,
  number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
  operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};;
Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
  number: /\b(-?(0x)?\d*\.?[\da-f]+|NaN|-?Infinity)\b/g
});
Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: !0
  }
});
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
    inside: {
      tag: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
        inside: Prism.languages.markup.tag.inside
      },
      rest: Prism.languages.javascript
    }
  }
});;
Prism.languages.coffeescript = Prism.languages.extend("javascript", {
  "block-comment": /([#]{3}\s*\r?\n(.*\s*\r*\n*)\s*?\r?\n[#]{3})/g,
  comment: /(\s|^)([#]{1}[^#^\r^\n]{2,}?(\r?\n|$))/g,
  keyword: /\b(this|window|delete|class|extends|namespace|extend|ar|let|if|else|while|do|for|each|of|return|in|instanceof|new|with|typeof|try|catch|finally|null|undefined|break|continue)\b/g
});
Prism.languages.insertBefore("coffeescript", "keyword", {
  "function": {
    pattern: /[a-z|A-z]+\s*[:|=]\s*(\([.|a-z\s|,|:|{|}|\"|\'|=]*\))?\s*->/gi,
    inside: {
      "function-name": /[_?a-z-|A-Z-]+(\s*[:|=])| @[_?$?a-z-|A-Z-]+(\s*)| /g,
      operator: /[-+]{1,2}|!|=?<|=?>|={1,2}|(&){1,2}|\|?\||\?|\*|\//g
    }
  },
  "class-name": {
    pattern: /(class\s+)[a-z-]+[\.a-z]*\s/gi,
    lookbehind: true
  },
  "attr-name": /[_?a-z-|A-Z-]+(\s*:)| @[_?$?a-z-|A-Z-]+(\s*)| /g
});
Prism.languages.scss = Prism.languages.extend("css", {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
    lookbehind: !0
  },
  atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
  url: /([-a-z]+-)*url(?=\()/gi,
  selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
});
Prism.languages.insertBefore("scss", "atrule", {
  keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return)|(?=@for\s+\$[-_\w]+\s)+from/i
});
Prism.languages.insertBefore("scss", "property", {
  variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
});
Prism.languages.insertBefore("scss", "ignore", {
  placeholder: /%[-_\w]+/i,
  statement: /\B!(default|optional)\b/gi,
  "boolean": /\b(true|false)\b/g,
  "null": /\b(null)\b/g,
  operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});;
Prism.languages.bash = Prism.languages.extend("clike", {
  comment: {
    pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
    lookbehind: !0
  },
  string: {
    pattern: /("|')(\\?[\s\S])*?\1/g,
    inside: {
      property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
    }
  },
  keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
});
Prism.languages.insertBefore("bash", "keyword", {
  property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
});
Prism.languages.insertBefore("bash", "comment", {
  important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});;
/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 *    constant, builtin, variable, symbol, regex
 */
Prism.languages.ruby = Prism.languages.extend('clike', {
  'comment': /#[^\r\n]*(\r?\n|$)/g,
  'keyword': /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
  'builtin': /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
  'constant': /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
});

Prism.languages.insertBefore('ruby', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  },
  'variable': /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  'symbol': /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});
;
