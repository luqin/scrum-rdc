(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./api"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./api"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.api);
    global.main = mod.exports;
  }
})(this, function (api) {
  "use strict";

  api = _interopRequireWildcard(api);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  api.getListBySprintId().then(function (response) {
    console.error(response);
  });
});