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
})({"js/tilt.jquery.js":[function(require,module,exports) {
(function ($) {
  $.fn.tilt = function (options) {
    /**
     * RequestAnimationFrame
     */
    var requestTick = function requestTick() {
      if (this.ticking) return;
      requestAnimationFrame(updateTransforms.bind(this));
      this.ticking = true;
    };
    /**
     * Bind mouse movement evens on instance
     */


    var bindEvents = function bindEvents() {
      $(this).on('mousemove', mouseMove);
      $(this).on('mouseenter', mouseEnter);
      if (this.settings.reset) $(this).on('mouseleave', mouseLeave);
    };
    /**
     * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
     */


    var setTransition = function setTransition() {
      var _this = this;

      if (this.timeout !== undefined) clearTimeout(this.timeout);
      $(this).css({
        'transition': "".concat(this.settings.speed, "ms ").concat(this.settings.easing)
      });
      if (this.settings.glare) this.glareElement.css({
        'transition': "opacity ".concat(this.settings.speed, "ms ").concat(this.settings.easing)
      });
      this.timeout = setTimeout(function () {
        $(_this).css({
          'transition': ''
        });
        if (_this.settings.glare) _this.glareElement.css({
          'transition': ''
        });
      }, this.settings.speed);
    };
    /**
     * When user mouse enters tilt element
     */


    var mouseEnter = function mouseEnter(event) {
      this.ticking = false;
      $(this).css({
        'will-change': 'transform'
      });
      setTransition.call(this); // Trigger change event

      $(this).trigger("tilt.mouseEnter");
    };
    /**
     * Return the x,y position of the muose on the tilt element
     * @returns {{x: *, y: *}}
     */


    var getMousePositions = function getMousePositions(event) {
      if (typeof event === "undefined") {
        event = {
          pageX: $(this).offset().left + $(this).outerWidth() / 2,
          pageY: $(this).offset().top + $(this).outerHeight() / 2
        };
      }

      return {
        x: event.pageX,
        y: event.pageY
      };
    };
    /**
     * When user mouse moves over the tilt element
     */


    var mouseMove = function mouseMove(event) {
      this.mousePositions = getMousePositions(event);
      requestTick.call(this);
    };
    /**
     * When user mouse leaves tilt element
     */


    var mouseLeave = function mouseLeave() {
      setTransition.call(this);
      this.reset = true;
      requestTick.call(this); // Trigger change event

      $(this).trigger("tilt.mouseLeave");
    };
    /**
     * Get tilt values
     *
     * @returns {{x: tilt value, y: tilt value}}
     */


    var getValues = function getValues() {
      var width = $(this).width();
      var height = $(this).height();
      var left = $(this).offset().left;
      var top = $(this).offset().top;
      var percentageX = (this.mousePositions.x - left) / width;
      var percentageY = (this.mousePositions.y - top) / height; // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value

      var tiltX = (this.settings.maxTilt / 2 - percentageX * this.settings.maxTilt).toFixed(2);
      var tiltY = (percentageY * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2); // angle

      var angle = Math.atan2(this.mousePositions.x - (left + width / 2), -(this.mousePositions.y - (top + height / 2))) * (180 / Math.PI); // Return x & y tilt values

      return {
        tiltX: tiltX,
        tiltY: tiltY,
        'percentageX': percentageX * 100,
        'percentageY': percentageY * 100,
        angle: angle
      };
    };
    /**
     * Update tilt transforms on mousemove
     */


    var updateTransforms = function updateTransforms() {
      this.transforms = getValues.call(this);

      if (this.reset) {
        this.reset = false;
        $(this).css('transform', "perspective(".concat(this.settings.perspective, "px) rotateX(0deg) rotateY(0deg)")); // Rotate glare if enabled

        if (this.settings.glare) {
          this.glareElement.css('transform', "rotate(180deg) scale(1.75)");
          this.glareElement.css('opacity', "".concat(this.settings.maxGlare / 4));
        }

        return;
      } else {
        $(this).css('transform', "perspective(".concat(this.settings.perspective, "px) rotateX(").concat(this.settings.axis === 'x' ? 0 : this.transforms.tiltY, "deg) rotateY(").concat(this.settings.axis === 'y' ? 0 : this.transforms.tiltX, "deg) scale3d(").concat(this.settings.scale, ",").concat(this.settings.scale, ",").concat(this.settings.scale, ")")); // Rotate glare if enabled

        if (this.settings.glare) {
          this.glareElement.css('transform', "rotate(".concat(this.transforms.angle, "deg) scale(1.75)"));
          this.glareElement.css('opacity', "".concat(this.transforms.percentageY * this.settings.maxGlare / 100));
        }
      } // Trigger change event


      $(this).trigger("change", [this.transforms]);
      this.ticking = false;
    };
    /**
     * Prepare elements
     */


    var prepareGlare = function prepareGlare() {
      var glarePrerender = this.settings.glarePrerender; // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.

      if (!glarePrerender) // Create glare element
        $(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'); // Store glare selector if glare is enabled

      this.glareElementWrapper = $(this).find(".js-tilt-glare");
      this.glareElement = $(this).find(".js-tilt-glare-inner"); // Remember? We assume all css is already set, so just return

      if (glarePrerender) return; // Abstracted re-usable glare styles

      var stretch = {
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%'
      }; // Style glare wrapper

      this.glareElementWrapper.css(stretch).css({
        'overflow': 'hidden'
      }); // Style glare element

      this.glareElement.css(stretch).css({
        'background-image': "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
        'opacity': "".concat(this.settings.maxGlare / 2),
        'transform': "rotate(180deg) scale(1.75)"
      });
    };
    /**
     * Public methods
     */


    $.fn.tilt.destroy = function () {
      $(this).each(function () {
        $(this).find('.js-tilt-glare').remove();
        $(this).css({
          'will-change': '',
          'transform': ''
        });
        $(this).off('mousemove mouseenter mouseleave');
      });
    };

    $.fn.tilt.getValues = function () {
      var results = [];
      $(this).each(function () {
        this.mousePositions = getMousePositions.call(this);
        results.push(getValues.call(this));
      });
      return results;
    };

    $.fn.tilt.reset = function () {
      $(this).each(function () {
        var _this2 = this;

        this.mousePositions = getMousePositions.call(this);
        this.settings = $(this).data('settings');
        mouseLeave.call(this);
        setTimeout(function () {
          _this2.reset = false;
        }, this.settings.transition);
      });
    };
    /**
     * Loop every instance
     */


    return this.each(function () {
      var _this3 = this;

      /**
       * Default settings merged with user settings
       * Can be set trough data attributes or as parameter.
       * @type {*}
       */
      this.settings = $.extend({
        maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
        perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 300,
        easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
        scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1.1',
        speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '400',
        transition: $(this).is('[data-tilt-transition]') ? $(this).data('tilt-transition') : true,
        axis: $(this).is('[data-tilt-axis]') ? $(this).data('tilt-axis') : null,
        reset: $(this).is('[data-tilt-reset]') ? $(this).data('tilt-reset') : true,
        glare: $(this).is('[data-tilt-glare]') ? $(this).data('tilt-glare') : false,
        maxGlare: $(this).is('[data-tilt-maxglare]') ? $(this).data('tilt-maxglare') : 1
      }, options);

      this.init = function () {
        // Store settings
        $(_this3).data('settings', _this3.settings); // Prepare element

        if (_this3.settings.glare) prepareGlare.call(_this3); // Bind events

        bindEvents.call(_this3);
      }; // Init


      this.init();
    });
  };
  /**
   * Auto load
   */


  $('[data-tilt]').tilt();
})(jQuery);
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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/tilt.jquery.js"], null)
//# sourceMappingURL=/tilt.jquery.86ad4383.map