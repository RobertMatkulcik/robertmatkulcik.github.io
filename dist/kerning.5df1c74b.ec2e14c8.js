// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"kerning.5df1c74b.js":[function(require,module,exports) {
var define;
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "ylfz": [function (require, module, exports) {
    function _typeof(e) {
      return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
        return _typeof2(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof2(e);
      })(e);
    }

    !function ($) {
      !function () {
        var hasSameOrigin = function hasSameOrigin(e) {
          return e === e.replace(/^([^\/]*)\/\/([^@]*@)?([^\/:]+)(:\d+)?.*/, function (t, n, r, i, s, a, o) {
            return n = "" === n ? window.location.protocol : n, s = void 0 === s ? "" : s.substring(1), n !== window.location.protocol ? "" : i !== window.location.hostname ? "" : s !== window.location.port ? "" : e;
          });
        };

        $.fn.findandfilter = function (e) {
          var t = this.filter(e).add(this.find(e));
          return t.prevObject = t.prevObject.prevObject, t;
        }, $.fn.parsecss = function (e, t) {
          var n = function n(t) {
            $.parsecss(t, e);
          };

          return this.findandfilter("style").each(function () {
            n(this.innerHTML);
          }).end().findandfilter('link[type="text/css"],link[rel="stylesheet"]').each(function () {
            !this.disabled && hasSameOrigin(this.href) && $.parsecss.mediumApplies(this.media) && $.get(this.href, n);
          }).end(), t && $.get(location.pathname + location.search, "text", function (t) {
            styleAttributes(t, e);
          }), this;
        }, $.parsecss = function (e, t) {
          var n = {};
          e = munge(e).replace(/@(([^;`]|`[^b]|`b[^%])*(`b%)?);?/g, function (e, n) {
            return processAtRule($.trim(n), t), "";
          }), $.each(e.split("`b%"), function (e, t) {
            (t = t.split("%b`")).length < 2 || (t[0] = restore(t[0]), n[t[0]] = $.extend(n[t[0]] || {}, parsedeclarations(t[1])));
          }), t(n);
        }, $.parsecss.mediumApplies = window.media && window.media.query || function (e) {
          if (!e) return !0;
          if (e in media) return media[e];
          var t = $('<style media="' + e + '">body {position: relative; z-index: 1;}</style>').appendTo("head");
          return media[e] = [1 == $("body").css("z-index"), t.remove()][0];
        }, $.parsecss.isValidSelector = function (e) {
          var t = $("<style>" + e + "{}</style>").appendTo("head")[0];
          return [t.styleSheet ? !/UNKNOWN/i.test(t.styleSheet.cssText) : !!t.sheet.cssRules.length, $(t).remove()][0];
        }, $.parsecss.parseArguments = function (str) {
          if (!str) return [];

          for (var ret = [], mungedArguments = munge(str, !0).split(/\s+/), i = 0; i < mungedArguments.length; ++i) {
            var a = restore(mungedArguments[i]);

            try {
              ret.push(eval("(" + a + ")"));
            } catch (err) {
              ret.push(a);
            }
          }

          return ret;
        }, $.parsecss.styleAttributes = styleAttributes;
        var media = {},
            munged = {};

        function parsedeclarations(e) {
          var t = munged[e].replace(/^{|}$/g, "");
          t = munge(t);
          var n = {};
          return $.each(t.split(";"), function (e, t) {
            (t = t.split(":")).length < 2 || (n[restore(t[0])] = restore(t.slice(1).join(":")));
          }), n;
        }

        var REbraces = /{[^{}]*}/,
            REfull = /\[[^\[\]]*\]|{[^{}]*}|\([^()]*\)|function(\s+\w+)?(\s*%b`\d+`b%){2}/,
            REatcomment = /\/\*@((?:[^\*]|\*[^\/])*)\*\//g,
            REcomment_string = /(?:\/\*(?:[^\*]|\*[^\/])*\*\/)|(\\.|"(?:[^\\\"]|\\.|\\\n)*"|'(?:[^\\\']|\\.|\\\n)*')/g,
            REmunged = /%\w`(\d+)`\w%/,
            uid = 0;

        function munge(e, t) {
          e = e.replace(REatcomment, "$1").replace(REcomment_string, function (e, t) {
            if (!t) return "";
            var n = "%s`" + ++uid + "`s%";
            return munged[uid] = t.replace(/^\\/, ""), n;
          });

          for (var n = t ? REfull : REbraces; match = n.exec(e);) {
            replacement = "%b`" + ++uid + "`b%", munged[uid] = match[0], e = e.replace(n, replacement);
          }

          return e;
        }

        function restore(e) {
          if (void 0 === e) return e;

          for (; match = REmunged.exec(e);) {
            e = e.replace(REmunged, munged[match[1]]);
          }

          return $.trim(e);
        }

        function processAtRule(e, t) {
          var n = e.split(/\s+/),
              r = n.shift();

          if ("media" == r) {
            var i = restore(n.pop()).slice(1, -1);
            $.parsecss.mediumApplies(n.join(" ")) && $.parsecss(i, t);
          } else if ("import" == r) {
            var s = restore(n.shift());
            $.parsecss.mediumApplies(n.join(" ")) && (s = s.replace(/^url\(|\)$/gi, "").replace(/^["']|["']$/g, ""), $.get(s, function (e) {
              $.parsecss(e, t);
            }));
          }
        }

        var _show = {
          show: $.fn.show,
          hide: $.fn.hide
        };
        $.each(["show", "hide"], function () {
          var e = this,
              t = _show[e],
              n = e + "Default";
          $.fn[e] = function () {
            return arguments.length > 0 ? t.apply(this, arguments) : this.each(function () {
              var e = $.data(this, n),
                  r = $(this);
              e ? ($.removeData(this, n), e.call(r), r.queue(function () {
                r.data(n, e).dequeue();
              })) : t.call(r);
            });
          }, $.fn[n] = function () {
            var t = $.makeArray(arguments),
                r = t[0];

            if ($.fn[r]) {
              t.shift();
              var i = $.fn[r];
            } else $.effects && $.effects[r] ? ("object" != _typeof(t[1]) && t.splice(1, 0, {}), i = _show[e]) : i = _show[e];

            return this.data(n, function () {
              i.apply(this, t);
            });
          };
        });
        var RESGMLcomment = /<!--([^-]|-[^-])*-->/g,
            REnotATag = /(>)[^<]*/g,
            REtag = /<(\w+)([^>]*)>/g;

        function styleAttributes(e, t) {
          var n,
              r = "",
              i = {};
          munge(e = e.replace(RESGMLcomment, "").replace(REnotATag, "$1")).replace(REtag, function (e, t, s) {
            if (t = t.toLowerCase(), i[t] ? ++i[t] : i[t] = 1, n = /\bstyle\s*=\s*(%s`\d+`s%)/i.exec(s)) {
              var a = /\bid\s*=\s*(\S+)/i.exec(s);
              a = a ? "#" + restore(a[1]).replace(/^['"]|['"]$/g, "") : t + ":eq(" + (i[t] - 1) + ")", r += [a, "{", restore(n[1]).replace(/^['"]|['"]$/g, ""), "}"].join("");
            }
          }), $.parsecss(r, t);
        }
      }(), function () {
        function e(e, t, n, r) {
          var i = e.text().split(t),
              s = "";
          i.length && ($(i).each(function (e, t) {
            s += '<span class="' + n + (e + 1) + '">' + t + "</span>" + r;
          }), e.empty().append(s));
        }

        var t = {
          init: function init() {
            return this.each(function () {
              e($(this), "", "char", "");
            });
          },
          words: function words() {
            return this.each(function () {
              e($(this), " ", "word", " ");
            });
          },
          lines: function lines() {
            return this.each(function () {
              var t = "eefec303079ad17405c889e092e105b0";
              e($(this).children("br").replaceWith(t).end(), t, "line", "");
            });
          }
        };

        $.fn.lettering = function (e) {
          return e && t[e] ? t[e].apply(this, [].slice.call(arguments, 1)) : "letters" !== e && e ? ($.error("Method " + e + " does not exist on jQuery.lettering"), this) : t.init.apply(this, [].slice.call(arguments, 0));
        };
      }();
      var unstack = (fontunstack = {
        init: function init(e) {
          var t = $(e).css("font-family").match(/[^'",;\s][^'",;]*/g) || [];
          return this.analyzeStack(t, e);
        },
        analyzeStack: function analyzeStack(e, t) {
          var n = ["monospace", "sans-serif", "serif", "cursive", "fantasy"],
              r = n[0],
              i = e.length,
              s = e[i - 1];
          $.inArray(s, n) && (e.push(r), i++), s == r && (r = n[1]);

          for (var a = 0; a < i - 1; a++) {
            if (font = e[a], fontunstack.testFont(font, r)) return font;
          }
        },
        testFont: function testFont(e, t) {
          var n = $('<span id="font_tester" style="font-family:' + t + '; font-size:144px;position:absolute;left:-10000px;top:-10000px;visibility:hidden;">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmml</span>');
          $("body").prepend(n);
          var r = n.width();
          n.css("font-family", e + "," + t);
          var i = n.width();
          return n.remove(), i != r;
        }
      }, function (e) {
        return fontunstack.init(e);
      }),
          fontunstack;
      window.Kerning = new function () {
        var e = this,
            t = navigator.platform,
            n = ["webkitTransform" in document.documentElement.style && "webkit", navigator.userAgent.indexOf("MSIE") > -1 && "ms", "MozTransform" in document.documentElement.style && "moz", window.opera && "o"].reduce(function (e, t) {
          return e + (t || "");
        }),
            r = [t.match(/Mac/) && "mac", t.match(/Win/) && "win", t.match(/Linux/) && "linux"].reduce(function (e, t) {
          return e + (t || "");
        }),
            i = {
          _pairs: function _pairs(e, t, n) {
            var r = n.match(/^-(letter|word)-pairs\(([\s\S]+)\)$/i);
            if (!r || r[1] !== e) return !1;
            var i,
                s,
                a,
                o = "word" === e ? t.children("span") : t.find("span > span"),
                c = n.match(/translate|rotate|skew|perspective/i),
                l = $.trim(r[2].replace(/,\s+?'/g, ",'").replace(/:\s+?(\d)/g, ":$1")).split(c ? ")," : ","),
                u = [];
            return l ? ($.each(l, function (t, n) {
              (i = n.split(":"))[0] = i[0].replace(/^['"](.+)['"]$/g, "$1"), s = "word" === e ? i[0].split(" ") : i[0], a = function a(t) {
                var n,
                    r,
                    i = $(this).text().match(new RegExp(s[0]));
                return " " !== s[1] ? r = ($(this).next().html() || "").match(new RegExp(s[1])) : (n = "word" == e ? $(this).next('[class^="word"]') : $(this).parent().next('[class^="word"]'), r = !$(this).next().length && n.length), i && r;
              }, u.push([i[1], o.filter(a)]);
            }), u) : void 0;
          },
          _repeats: function _repeats(e, t, n) {
            var r = n.match(/^-(letter|word)-repeats\(([\s\S]+)\)$/i);
            if (!r || r[1] !== e) return !1;
            var i,
                s = "word" === e ? t.children("span") : t.find("span > span"),
                a = n.match(/translate|rotate|skew|perspective/i),
                o = $.trim(r[2].replace(/,\s+?'/g, ",'").replace(/:\s+?(\d)/g, ":$1")).split(a ? ")," : ","),
                c = [];
            return o ? ($.each(o, function (e, t) {
              i = t.split(":"), a && ")" !== i[1].substring(i[1].length - 1) && (i[1] += ")"), c.push([$.trim(i[1]), s.filter(":nth-child(" + $.trim(i[0]) + ")")]);
            }), c) : void 0;
          },
          _conditional: function _conditional(e, t, n) {
            var r = n.match(/^(?:-(letter|word)-)?if-font\(([\s\S]+)\)$/i);

            if (r) {
              "all" === e || ("word" === e ? t.children("span") : t.find("span > span")), n.match(/translate|rotate|skew|perspective/i);
              var i,
                  s = r[2].replace(/\n/g, "").match(/['"][^'"]+['"]:\s*.+?(\)|(?=\w),\s['"]|$)/g),
                  a = {},
                  o = [];
              if (s) return t.each(function (e, t) {
                var n = unstack(t).replace(/^['"](.+)['"]$/g, "$1");
                a[n] ? a[n].push(t) : a[n] = [t];
              }), $.each(s, function (e, t) {
                if (!(i = t.match(/['"]([^'"]+)['"]:\s*(.+)$/))) return !0;
                (i = i.splice(1))[0] in a && o.push([$.trim(i[1]), $(a[i[0]])]);
              }), o;
            }
          },
          _applyAttribute: function _applyAttribute(e, t, n, r) {
            var s = i._conditional(e, t, r);

            s && s.length || (s = [[r, t]]), $.each(s, function (t, r) {
              var s,
                  a,
                  o,
                  c = r[0],
                  l = r[1],
                  u = i._pairs(e, l, c) || i._repeats(e, l, c);

              u ? $.each(u, function (e, t) {
                if ("string" != typeof n) {
                  var r = {};
                  $.each(n, function (e, n) {
                    r[n] = t[0];
                  }), t[1].css(r);
                } else t[1].css(n, t[0]);
              }) : (s = (o = c.match(/-transform-group\(([\s\S]+?\([^)]+\))*?\)/g)) ? $.map(o, function (e, t) {
                return e.replace(/-transform-group\(([\s\S]+)\)$/, "$1");
              }) : c.replace(/[\n\s]+/g, " ").split(" "), l.each(function (t, r) {
                a = "all" === e ? $(r) : "word" === e ? $(r).children("span") : $(r).find("span > span"), $.each(s, function (e, t) {
                  if ("string" != typeof n) {
                    var r = {};
                    $.each(n, function (e, n) {
                      r[n] = t;
                    }), a.eq(e).css(r);
                  } else a.eq(e).css(n, t);
                });
              }));
            });
          },
          kern: function kern(e, t, n) {
            i._applyAttribute(e, t, "margin-right", n);
          },
          size: function size(e, t, n) {
            i._applyAttribute(e, t, "font-size", n);
          },
          weight: function weight(e, t, n) {
            i._applyAttribute(e, t, "font-weight", n);
          },
          color: function color(e, t, n) {
            i._applyAttribute(e, t, "color", n);
          },
          backgroundcolor: function backgroundcolor(e, t, n) {
            i._applyAttribute(e, t, "background-color", n);
          },
          transform: function transform(e, t, n) {
            i._applyAttribute(e, t, ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"], n);
          }
        };
        this._parse = function (t, s) {
          for (var a in e._parsedCSS || (e._parsedCSS = t), t) {
            for (var o in t[a]) {
              var c,
                  l,
                  u = t[a][o];

              if (c = o.match(new RegExp("^(-" + n + "|-" + r + ")?-(letter|word)-(kern|transform|size|color|backgroundcolor|weight)", "i"))) {
                var f = c[2].toLowerCase(),
                    p = c[3].toLowerCase();
                l = $(a), s && (l = l.not(".kerningjs")), l.not(".kerningjs").addClass("kerningjs").css("visibility", "inherit").lettering("words").children("span").css("display", "inline-block").lettering().children("span").css("display", "inline-block"), i[p] && i[p].call(this, f, l, u);
              } else if ((c = o.match(/font-(size|weight)/i)) && u.match(/if-font/i)) {
                p = c[1].toLowerCase();
                l = $(a), s && (l = l.not(".kerningjs")), l.not(".kerningjs").addClass("kerningjs").css("visibility", "inherit"), i[p] && i[p].call(this, "all", l, u);
              }
            }
          }
        }, this.live = function () {
          $(document).bind("DOMNodeInserted", function (t) {
            t.target && e.refresh(!0);
          });
        }, this.refresh = function (t) {
          e._parsedCSS && e._parse(e._parsedCSS, t);
        }, $(function () {
          $(document).parsecss(e._parse, !0);
        });
      }();
    }(jQuery);
  }, {}]
}, {}, ["ylfz"], null);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52504" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","kerning.5df1c74b.js"], null)
//# sourceMappingURL=/kerning.5df1c74b.ec2e14c8.map