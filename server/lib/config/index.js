(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    port: 8001,
    url: 'mongodb://localhost:27017/elm',
    session: {
      name: 'SID',
      secret: 'SID',
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    }
  };
  _exports.default = _default;
});