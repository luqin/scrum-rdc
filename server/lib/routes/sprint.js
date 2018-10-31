(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "express", "../controller/sprint"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("express"), require("../controller/sprint"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.express, global.sprint);
    global.sprint = mod.exports;
  }
})(this, function (_exports, _express, Sprint) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _express = _interopRequireDefault(_express);
  Sprint = _interopRequireWildcard(Sprint);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var router = _express.default.Router();

  router.post('/login', Sprint.login);
  router.get('/getListBySprintId', Sprint.getListBySprintId);
  var _default = router;
  _exports.default = _default;
});