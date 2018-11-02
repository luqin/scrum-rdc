(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["express", "./config", "./routes/index.js", "cookie-parser", "express-session", "path", "connect-history-api-fallback", "chalk", "./request"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("express"), require("./config"), require("./routes/index.js"), require("cookie-parser"), require("express-session"), require("path"), require("connect-history-api-fallback"), require("chalk"), require("./request"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.express, global.config, global.index, global.cookieParser, global.expressSession, global.path, global.connectHistoryApiFallback, global.chalk, global.request);
    global.app = mod.exports;
  }
})(this, function (_express, _config, _index, _cookieParser, _expressSession, _path, _connectHistoryApiFallback, _chalk, _request) {
  "use strict";

  _express = _interopRequireDefault(_express);
  _config = _interopRequireDefault(_config);
  _index = _interopRequireDefault(_index);
  _cookieParser = _interopRequireDefault(_cookieParser);
  _expressSession = _interopRequireDefault(_expressSession);
  _path = _interopRequireDefault(_path);
  _connectHistoryApiFallback = _interopRequireDefault(_connectHistoryApiFallback);
  _chalk = _interopRequireDefault(_chalk);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var app = (0, _express.default)();
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin || 'https://cangdu.org');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Token, X-RDC-Token');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); // 可以带cookies

    res.header('X-Powered-By', '3.2.1');
    var aliyunCookie = req.headers['x-rdc-token'];

    if (aliyunCookie) {
      (0, _request.setCookie)(aliyunCookie);
    }

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  app.use(_express.default.static(_path.default.join(__dirname, '../../dist')));
  app.use((0, _cookieParser.default)());
  app.use((0, _expressSession.default)({
    name: _config.default.session.name,
    secret: _config.default.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: _config.default.session.cookie
  }));
  (0, _index.default)(app);
  app.use((0, _connectHistoryApiFallback.default)()); // app.use(express.static('./public'))

  app.listen(_config.default.port, function () {
    console.log(_chalk.default.green("\u6210\u529F\u76D1\u542C\u7AEF\u53E3\uFF1A".concat(_config.default.port)));
  });
});