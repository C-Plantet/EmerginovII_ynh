"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSMS = sendSMS;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var accountSid = 'ACd6d506454a4dd8ad756513b1eba9983c';
var authToken = 'a29e726be0912641452a6c70adb41382';

function sendSMS(_x, _x2) {
  return _sendSMS.apply(this, arguments);
}

function _sendSMS() {
  _sendSMS = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, phoneNumber, sms, client;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, phoneNumber = _req$body.phoneNumber, sms = _req$body.sms;
            client = require('twilio')(accountSid, authToken);
            client.validationRequests.create({
              friendlyName: 'My Home',
              phoneNumber: phoneNumber
            }).then(function (validation_request) {
              return console.log(validation_request.friendlyName);
            });
            client.messages.create({
              body: sms,
              from: '+15106940839',
              to: phoneNumber
            }).then(function (message) {
              return console.log(message.sid);
            });
            res.json({
              "message": "sms sent !"
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendSMS.apply(this, arguments);
}