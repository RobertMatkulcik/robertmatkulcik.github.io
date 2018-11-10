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
})({"tilt.jquery.2e9b745a.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "FX9H": [function (require, module, exports) {
    !function (t) {
      t.fn.tilt = function (s) {
        var i = function i() {
          this.ticking || (requestAnimationFrame(o.bind(this)), this.ticking = !0);
        },
            e = function e() {
          var s = this;
          void 0 !== this.timeout && clearTimeout(this.timeout), t(this).css({
            transition: "".concat(this.settings.speed, "ms ").concat(this.settings.easing)
          }), this.settings.glare && this.glareElement.css({
            transition: "opacity ".concat(this.settings.speed, "ms ").concat(this.settings.easing)
          }), this.timeout = setTimeout(function () {
            t(s).css({
              transition: ""
            }), s.settings.glare && s.glareElement.css({
              transition: ""
            });
          }, this.settings.speed);
        },
            a = function a(s) {
          this.ticking = !1, t(this).css({
            "will-change": "transform"
          }), e.call(this), t(this).trigger("tilt.mouseEnter");
        },
            n = function n(s) {
          return void 0 === s && (s = {
            pageX: t(this).offset().left + t(this).outerWidth() / 2,
            pageY: t(this).offset().top + t(this).outerHeight() / 2
          }), {
            x: s.pageX,
            y: s.pageY
          };
        },
            h = function h(t) {
          this.mousePositions = n(t), i.call(this);
        },
            r = function r() {
          e.call(this), this.reset = !0, i.call(this), t(this).trigger("tilt.mouseLeave");
        },
            l = function l() {
          var s = t(this).width(),
              i = t(this).height(),
              e = t(this).offset().left,
              a = t(this).offset().top,
              n = (this.mousePositions.x - e) / s,
              h = (this.mousePositions.y - a) / i;
          return {
            tiltX: (this.settings.maxTilt / 2 - n * this.settings.maxTilt).toFixed(2),
            tiltY: (h * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2),
            percentageX: 100 * n,
            percentageY: 100 * h,
            angle: Math.atan2(this.mousePositions.x - (e + s / 2), -(this.mousePositions.y - (a + i / 2))) * (180 / Math.PI)
          };
        },
            o = function o() {
          if (this.transforms = l.call(this), this.reset) return this.reset = !1, t(this).css("transform", "perspective(".concat(this.settings.perspective, "px) rotateX(0deg) rotateY(0deg)")), void (this.settings.glare && (this.glareElement.css("transform", "rotate(180deg) scale(1.75)"), this.glareElement.css("opacity", "".concat(this.settings.maxGlare / 4))));
          t(this).css("transform", "perspective(".concat(this.settings.perspective, "px) rotateX(").concat("x" === this.settings.axis ? 0 : this.transforms.tiltY, "deg) rotateY(").concat("y" === this.settings.axis ? 0 : this.transforms.tiltX, "deg) scale3d(").concat(this.settings.scale, ",").concat(this.settings.scale, ",").concat(this.settings.scale, ")")), this.settings.glare && (this.glareElement.css("transform", "rotate(".concat(this.transforms.angle, "deg) scale(1.75)")), this.glareElement.css("opacity", "".concat(this.transforms.percentageY * this.settings.maxGlare / 100))), t(this).trigger("change", [this.transforms]), this.ticking = !1;
        };

        return t.fn.tilt.destroy = function () {
          t(this).each(function () {
            t(this).find(".js-tilt-glare").remove(), t(this).css({
              "will-change": "",
              transform: ""
            }), t(this).off("mousemove mouseenter mouseleave");
          });
        }, t.fn.tilt.getValues = function () {
          var s = [];
          return t(this).each(function () {
            this.mousePositions = n.call(this), s.push(l.call(this));
          }), s;
        }, t.fn.tilt.reset = function () {
          t(this).each(function () {
            var s = this;
            this.mousePositions = n.call(this), this.settings = t(this).data("settings"), r.call(this), setTimeout(function () {
              s.reset = !1;
            }, this.settings.transition);
          });
        }, this.each(function () {
          var i = this;
          this.settings = t.extend({
            maxTilt: t(this).is("[data-tilt-max]") ? t(this).data("tilt-max") : 20,
            perspective: t(this).is("[data-tilt-perspective]") ? t(this).data("tilt-perspective") : 300,
            easing: t(this).is("[data-tilt-easing]") ? t(this).data("tilt-easing") : "cubic-bezier(.03,.98,.52,.99)",
            scale: t(this).is("[data-tilt-scale]") ? t(this).data("tilt-scale") : "1.1",
            speed: t(this).is("[data-tilt-speed]") ? t(this).data("tilt-speed") : "400",
            transition: !t(this).is("[data-tilt-transition]") || t(this).data("tilt-transition"),
            axis: t(this).is("[data-tilt-axis]") ? t(this).data("tilt-axis") : null,
            reset: !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
            glare: !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
            maxGlare: t(this).is("[data-tilt-maxglare]") ? t(this).data("tilt-maxglare") : 1
          }, s), this.init = function () {
            t(i).data("settings", i.settings), i.settings.glare && function () {
              var s = this.settings.glarePrerender;

              if (s || t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'), this.glareElementWrapper = t(this).find(".js-tilt-glare"), this.glareElement = t(this).find(".js-tilt-glare-inner"), !s) {
                var i = {
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%"
                };
                this.glareElementWrapper.css(i).css({
                  overflow: "hidden"
                }), this.glareElement.css(i).css({
                  "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  opacity: "".concat(this.settings.maxGlare / 2),
                  transform: "rotate(180deg) scale(1.75)"
                });
              }
            }.call(i), function () {
              t(this).on("mousemove", h), t(this).on("mouseenter", a), this.settings.reset && t(this).on("mouseleave", r);
            }.call(i);
          }, this.init();
        });
      }, t("[data-tilt]").tilt();
    }(jQuery);
  }, {}]
}, {}, ["FX9H"], null);
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","tilt.jquery.2e9b745a.js"], null)
//# sourceMappingURL=/tilt.jquery.2e9b745a.50773b1d.map