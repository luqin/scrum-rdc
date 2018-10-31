(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../api"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../api"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api);
    global.index = mod.exports;
  }
})(this, function (_exports, api) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.login = login;
  _exports.getListBySprintId = getListBySprintId;
  api = _interopRequireWildcard(api);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  // import formidable from 'formidable'
  function login(req, res, next) {
    res.send({
      status: 1,
      success: '登录成功'
    });
  }

  function getListBySprintId(req, res, next) {
    return api.getListBySprintId(req.query).then(function (response) {
      res.send(response.data);
    }).catch(function (e) {
      res.send({
        status: 0,
        type: 'ERROR',
        message: e
      });
    });
  }
});