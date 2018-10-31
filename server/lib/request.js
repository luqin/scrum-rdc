(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "axios"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("axios"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios);
    global.request = mod.exports;
  }
})(this, function (_exports, _axios) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setCookie = setCookie;
  _exports.default = void 0;
  _axios = _interopRequireDefault(_axios);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var cookie = null; // create an axios instance

  var service = _axios.default.create({
    baseURL: 'https://rdc.aliyun.com/',
    // api 的 base_url
    timeout: 5000 // request timeout

  }); // request interceptor


  service.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (!cookie) {
      return Promise.reject('cookie必填');
    }

    config.headers['cookie'] = cookie;
    return config;
  }, function (error) {
    // Do something with request error
    console.log('request:', error); // for debug

    Promise.reject(error);
  }); // response interceptor

  service.interceptors.response.use(function (response) {
    if (_typeof(response.data) !== 'object') {
      return Promise.reject('阿里云效请求失败，cookie可能过期');
    }

    return response;
  }, function (error) {
    console.log('request err: ', error); // for debug

    return Promise.reject('阿里云效请求失败，cookie可能过期');
  });

  function setCookie(val) {
    cookie = val;
  }

  var _default = service;
  _exports.default = _default;
});