"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _git = _interopRequireDefault(require("./routes/git"));

var _projects = _interopRequireDefault(require("./routes/projects"));

var _users = _interopRequireDefault(require("./routes/users"));

var _home = _interopRequireDefault(require("./routes/home"));

var _php = _interopRequireDefault(require("./routes/php"));

var _save = _interopRequireDefault(require("./routes/save"));

var _slack = _interopRequireDefault(require("./routes/slack"));

var _sms = _interopRequireDefault(require("./routes/sms"));

var _mail = _interopRequireDefault(require("./routes/mail"));

var _mastodon = _interopRequireDefault(require("./routes/mastodon"));

var _zip = _interopRequireDefault(require("./routes/zip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])(); //Importing routes

//middlewares
app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)()); // support parsing of application/json type post data

app.use(_bodyParser["default"].json()); //support parsing of application/x-www-form-urlencoded post data

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/login', function (req, res) {
  res.redirect('/login.html');
});
app.use(_express["default"]["static"](__dirname + '/public')); //routes

app.use('/api/projects', _projects["default"]);
app.use('/api/users', _users["default"]);
app.use('/api/users/login', _users["default"]);
app.use('/home', _home["default"]);
app.use('/php', _php["default"]);
app.use('/save', _save["default"]);
app.use('/repos', _git["default"]);
app.use('/slack', _slack["default"]);
app.use('/sms', _sms["default"]);
app.use('/mail', _mail["default"]);
app.use('/mastodon', _mastodon["default"]);
app.use('/zip', _zip["default"]);
var _default = app;
exports["default"] = _default;