(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./request"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./request"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.request);
    global.api = mod.exports;
  }
})(this, function (_exports, _request) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getListBySprintId = getListBySprintId;
  _request = _interopRequireDefault(_request);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function getListBySprintId() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _request.default)({
      url: '/project/202912/sprint/getListBySprintId',
      method: 'get',
      params: Object.assign({
        spm: 'a2c40.cloud_prod_sprint_tree.0.0.567141ccHCT4hA',
        versionId: undefined,
        filterCondition: 'groupBy=false&order=desc',
        groupBy: false,
        order: 'desc',
        pageSize: 200,
        akProjectId: 202912
      }, params)
    });
  }
});