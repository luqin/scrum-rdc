(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./sprint"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./sprint"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.sprint);
    global.index = mod.exports;
  }
})(this, function (_exports, _sprint) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _sprint = _interopRequireDefault(_sprint);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = function _default(app) {
    app.use('/sprint', _sprint.default);
  };

  _exports.default = _default;
});