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
})({"js/main.js":[function(require,module,exports) {
jQuery(document).ready(function () {
  var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
      coverLayer = $('.cd-cover-layer');
  /*
   convert a cubic bezier value to a custom mina easing
   http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
   */

  var duration = 600,
      epsilon = 1000 / 60 / duration / 4,
      firstCustomMinaAnimation = bezier(.63, .35, .48, .92, epsilon);
  modalTriggerBts.each(function () {
    initModal($(this));
  });

  function initModal(modalTrigger) {
    var modalTriggerId = modalTrigger.attr('id'),
        modal = $('.cd-modal[data-modal="' + modalTriggerId + '"]'),
        svgCoverLayer = modal.children('.cd-svg-bg'),
        paths = svgCoverLayer.find('path'),
        pathsArray = []; //store Snap objects

    pathsArray[0] = Snap('#' + paths.eq(0).attr('id')), pathsArray[1] = Snap('#' + paths.eq(1).attr('id')), pathsArray[2] = Snap('#' + paths.eq(2).attr('id')); //store path 'd' attribute values

    var pathSteps = [];
    pathSteps[0] = svgCoverLayer.data('step1');
    pathSteps[1] = svgCoverLayer.data('step2');
    pathSteps[2] = svgCoverLayer.data('step3');
    pathSteps[3] = svgCoverLayer.data('step4');
    pathSteps[4] = svgCoverLayer.data('step5');
    pathSteps[5] = svgCoverLayer.data('step6'); //open modal window

    modalTrigger.on('click', function (event) {
      event.preventDefault();
      modal.addClass('modal-is-visible');
      coverLayer.addClass('modal-is-visible');
      animateModal(pathsArray, pathSteps, duration, 'open');
    }); //close modal window

    modal.on('click', '.modal-close', function (event) {
      event.preventDefault();
      modal.removeClass('modal-is-visible');
      coverLayer.removeClass('modal-is-visible');
      animateModal(pathsArray, pathSteps, duration, 'close');
    });
  }

  function animateModal(paths, pathSteps, duration, animationType) {
    var path1 = animationType == 'open' ? pathSteps[1] : pathSteps[0],
        path2 = animationType == 'open' ? pathSteps[3] : pathSteps[2],
        path3 = animationType == 'open' ? pathSteps[5] : pathSteps[4];
    paths[0].animate({
      'd': path1
    }, duration, firstCustomMinaAnimation);
    paths[1].animate({
      'd': path2
    }, duration, firstCustomMinaAnimation);
    paths[2].animate({
      'd': path3
    }, duration, firstCustomMinaAnimation);
  }

  function bezier(x1, y1, x2, y2, epsilon) {
    //https://github.com/arian/cubic-bezier
    var curveX = function curveX(t) {
      var v = 1 - t;
      return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    var curveY = function curveY(t) {
      var v = 1 - t;
      return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    var derivativeCurveX = function derivativeCurveX(t) {
      var v = 1 - t;
      return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
    };

    return function (t) {
      var x = t,
          t0,
          t1,
          t2,
          x2,
          d2,
          i; // First try a few iterations of Newton's method -- normally very fast.

      for (t2 = x, i = 0; i < 8; i++) {
        x2 = curveX(t2) - x;
        if (Math.abs(x2) < epsilon) return curveY(t2);
        d2 = derivativeCurveX(t2);
        if (Math.abs(d2) < 1e-6) break;
        t2 = t2 - x2 / d2;
      }

      t0 = 0, t1 = 1, t2 = x;
      if (t2 < t0) return curveY(t0);
      if (t2 > t1) return curveY(t1); // Fallback to the bisection method for reliability.

      while (t0 < t1) {
        x2 = curveX(t2);
        if (Math.abs(x2 - x) < epsilon) return curveY(t2);
        if (x > x2) t0 = t2;else t1 = t2;
        t2 = (t1 - t0) * .5 + t0;
      } // Failure


      return curveY(t2);
    };
  }

  ;
  document.querySelector(".left-corner").addEventListener("click", function () {
    var url = "http://colormind.io/api/";
    var data = {
      model: "default"
    };
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var palette = JSON.parse(http.responseText).result;
        document.documentElement.style.setProperty('--color1', "rgb(" + palette[4][0] + "," + palette[4][1] + "," + palette[4][2] + ")");
        document.documentElement.style.setProperty('--color3', "rgb(" + palette[0][0] + "," + palette[0][1] + "," + palette[0][2] + ")");
        document.documentElement.style.setProperty('--color2', "rgb(" + palette[2][0] + "," + palette[2][1] + "," + palette[2][2] + ")"); // --color1: rgb(50,53,64);
        // --color2: rgb(211,84,78);
        // --color1: #353B53;
        // --color2: #6EA785;
        // --color1: rgb(29,46,31);
        // --color2: rgb(155,96,78);
      }
    };

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
  });
  setTimeout(function () {
    $('.loading-container').fadeOut(function () {
      $(this).hide();
    });
  }, 1100);
});
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49342" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.map