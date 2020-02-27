var trimLastPart = ['og:image:url', 'og:video:url', 'og:audio:url', 'og:locale:current', 'music:album:url', 'music:song:url', 'video:actor:url'];

var OpenGraph = /*#__PURE__*/function () {
  function OpenGraph(defaults, customNS) {
    this.defaults = defaults;
    this.customNS = customNS;
  }

  var _proto = OpenGraph.prototype;

  _proto.set = function set(properties, customNS) {
    this.clear();
    var ns = {
      og: 'http://ogp.me/ns#'
    };

    if (properties.fb) {
      ns.fb = 'http://ogp.me/ns/fb#';
    }

    var type = properties.og && properties.og.type;

    if (type && !type.includes(':')) {
      type = type.split('.')[0];
      ns[type] = "http://ogp.me/ns/" + type + "#";
    }

    if (customNS !== null && (customNS || this.customNS)) {
      Object.assign(ns, customNS || this.customNS);
    }

    var prefix = Object.entries(ns).map(function (_ref) {
      var k = _ref[0],
          v = _ref[1];
      return k + ': ' + v;
    }).join(' ');
    document.head.setAttribute('prefix', prefix);
    var meta = this.parse(properties);

    if (this.defaults) {
      var exists = meta.map(function (m) {
        return m.property;
      });
      var defaultMeta = this.parse(this.defaults).filter(function (m) {
        return !exists.includes(m.property);
      });

      if (defaultMeta.length) {
        meta = meta.concat(defaultMeta);
      }
    }

    for (var _iterator = meta, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var m = _ref2;
      this.insertElem(m);
    }
  };

  _proto.clear = function clear() {
    document.head.removeAttribute('prefix');
    var els = document.head.querySelectorAll('meta[property]');

    for (var _iterator2 = els, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var el = _ref3;
      document.head.removeChild(el);
    }
  };

  _proto.parse = function parse(obj, prefix) {
    if (prefix === void 0) {
      prefix = '';
    }

    var result = [];

    for (var k in obj) {
      var v = obj[k];

      if (!v) {
        continue;
      }

      var property = prefix ? prefix + ':' + k : k;

      if (trimLastPart.includes(property)) {
        property = prefix;
      }

      if (v.constructor === Object) {
        result = result.concat(this.parse(v, property));
      } else if (v.constructor === Array) {
        for (var _iterator3 = v, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref4 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref4 = _i3.value;
          }

          var item = _ref4;

          if (item.constructor === Object) {
            result = result.concat(this.parse(item, property));
          } else {
            result.push({
              property: property,
              content: item
            });
          }
        }
      } else {
        result.push({
          property: property,
          content: v
        });
      }
    }

    return result;
  };

  _proto.insertElem = function insertElem(attrs) {
    var meta = document.createElement('meta');

    for (var name in attrs) {
      meta.setAttribute(name, attrs[name]);
    }

    document.head.appendChild(meta);
  };

  return OpenGraph;
}();

export default OpenGraph;
