var trimLastPart = ['og:image:url', 'og:video:url', 'og:audio:url', 'og:locale:current', 'music:album:url', 'music:song:url', 'video:actor:url'];

var OpenGraph =
/*#__PURE__*/
function () {
  function OpenGraph(properties, customNS) {
    this.properties = properties;
    this.customNS = customNS;
  }

  var _proto = OpenGraph.prototype;

  _proto.set = function set(properties, customNS) {
    this.clear();
    var ns = ['og: http://ogp.me/ns#'];
    if (properties.fb) ns.push('fb: http://ogp.me/ns/fb#');
    var type = properties.og && properties.og.type;

    if (type && !type.includes(':')) {
      type = type.split('.')[0];
      ns.push(type + ": http://ogp.me/ns/" + type + "#");
    }

    if (customNS) ns = ns.concat(customNS);else if (this.customNS) ns = ns.concat(this.customNS);
    document.head.setAttribute('prefix', ns.join(' '));
    var meta = this.parse(properties);

    if (this.properties) {
      var exists = meta.map(function (m) {
        return m.property;
      });
      var defaultMeta = this.parse(this.properties).filter(function (m) {
        return !exists.includes(m.property);
      });
      if (defaultMeta.length) meta = meta.concat(defaultMeta);
    }

    for (var _iterator = meta, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var m = _ref;
      this.insertElem(m);
    }
  };

  _proto.clear = function clear() {
    document.head.removeAttribute('prefix');
    var els = document.head.querySelectorAll('meta[property]');

    for (var _iterator2 = els, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var el = _ref2;
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
      if (!v) continue;
      var property = prefix ? prefix + ':' + k : k;
      if (trimLastPart.includes(property)) property = prefix;

      if (v.constructor === Object) {
        result = result.concat(this.parse(v, property));
      } else if (v.constructor === Array) {
        for (var _iterator3 = v, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var item = _ref3;

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
