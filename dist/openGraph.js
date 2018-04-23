(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.openGraph = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.set = set;
  exports.clear = clear;
  var trimLastPart = ['og:image:url', 'og:video:url', 'og:audio:url', 'og:locale:current', 'music:album:url', 'music:song:url', 'video:actor:url'];

  function parse(obj) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var result = [];

    for (var k in obj) {
      var v = obj[k];
      if (!v) continue;

      var property = prefix ? prefix + ':' + k : k;
      if (trimLastPart.includes(property)) property = prefix;

      if (v.constructor === Object) {
        result = result.concat(parse(v, property));
      } else if (v.constructor === Array) {
        for (var _iterator = v, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var item = _ref;

          if (item.constructor === Object) {
            result = result.concat(parse(item, property));
          } else {
            result.push({ property: property, item: item });
          }
        }
      } else {
        result.push({ property: property, v: v });
      }
    }

    return result;
  }

  function insertElem(attrs) {
    var meta = document.createElement('meta');

    for (var name in attrs) {
      meta.setAttribute(name, attrs[name]);
    }

    document.head.appendChild(meta);
  }

  function set(openGraph, namespace) {
    clear();

    var ns = ['og: http://ogp.me/ns#'];
    if (openGraph.fb) ns.push('fb: http://ogp.me/ns/fb#');

    var type = openGraph.og && openGraph.og.type;
    if (type && !type.includes(':')) {
      type = type.split('.')[0];
      ns.push(type + ': http://ogp.me/ns/' + type + '#');
    }

    if (namespace) ns = ns.concat(namespace);

    document.head.setAttribute('prefix', ns.join(' '));

    var meta = parse(openGraph);
    for (var _iterator2 = meta, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var m = _ref2;
      insertElem(m);
    }
  }

  function clear() {
    document.head.removeAttribute('prefix');
    var els = document.head.querySelectorAll('meta[property]');
    for (var _iterator3 = els, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var el = _ref3;
      document.head.removeChild(el);
    }
  }

  exports.default = { set: set, clear: clear };
});