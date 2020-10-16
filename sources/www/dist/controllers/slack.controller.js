"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastMessage = getLastMessage;
exports.putMessage = putMessage;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var token = "xoxp-835473819876-837792425767-838148967462-a6d016a4d8b66f07baf85eeb865406e9";

var _require = require("@slack/web-api"),
    WebClient = _require.WebClient;

var web = new WebClient(token);

function getLastMessage(_x, _x2) {
  return _getLastMessage.apply(this, arguments);
}

function _getLastMessage() {
  _getLastMessage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return web.conversations.history({
              channel: "CQKDXQWS0",
              limit: 4
            });

          case 2:
            msg = _context.sent;
            res.json({
              "msg3": msg.messages[3].username + ": " + msg.messages[3].text,
              "msg2": msg.messages[2].username + ": " + msg.messages[2].text,
              "msg1": msg.messages[1].username + ": " + msg.messages[1].text,
              "msg0": msg.messages[0].username + ": " + msg.messages[0].text
            });
            console.log(msg);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getLastMessage.apply(this, arguments);
}

function putMessage(_x3, _x4) {
  return _putMessage.apply(this, arguments);
}

function _putMessage() {
  _putMessage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var users, user, message;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return web.users.list();

          case 2:
            users = _context3.sent;
            user = users.members[0].name;
            message = req.body.message;

            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var res;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return web.chat.postMessage({
                        username: "mrejebsf",
                        link_names: true,
                        channel: "CQKDXQWS0",
                        text: message
                      });

                    case 2:
                      res = _context2.sent;
                      // `res` contains information about the posted message
                      console.log('Message sent: ', res.ts);
                      console.log(res);

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }))();

            res.json({
              "name": user
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _putMessage.apply(this, arguments);
}