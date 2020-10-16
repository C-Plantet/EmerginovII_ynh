"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_Git_Repository = create_Git_Repository;
exports.delete_Git_Repository = delete_Git_Repository;

var _phpController = _interopRequireDefault(require("./php.controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//require("dotenv").config();
var octokit = require('@octokit/rest');

var $ = require("jquery");

function create_Git_Repository(_x, _x2) {
  return _create_Git_Repository.apply(this, arguments);
}

function _create_Git_Repository() {
  _create_Git_Repository = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, token, clientWithAuth;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, token = _req$body.token;
            clientWithAuth = new octokit({
              //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"
              auth: token
            });
            clientWithAuth.repos.createForAuthenticatedUser({
              name: name
            }).then(function (data) {
              console.log("repo successfully created");
            })["catch"](function (e) {
              console.log(e); //  alert("ERROR check your informations");
            });
            return _context.abrupt("return", res.redirect('/home.html'));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create_Git_Repository.apply(this, arguments);
}

function delete_Git_Repository(_x3, _x4) {
  return _delete_Git_Repository.apply(this, arguments);
}
/*clientWithAuth.repos.delete({
  owner: "moncef08",
  repo:"testing123"
}).then(data =>{
  console.log("repo successfully deleted");
}).catch(e =>{
  console.log(e);
})*/


function _delete_Git_Repository() {
  _delete_Git_Repository = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, name, token, clientWithAuth;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, name = _req$body2.name, token = _req$body2.token;
            clientWithAuth = new octokit({
              auth: token
            });
            clientWithAuth.repos["delete"]({
              owner: username,
              repo: name
            }).then(function (data) {
              console.log("repo successfully deleted");
            })["catch"](function (e) {
              console.log(e);
            });
            return _context2.abrupt("return", res.redirect('/home.html'));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _delete_Git_Repository.apply(this, arguments);
}