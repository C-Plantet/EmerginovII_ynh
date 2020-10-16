"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = sendEmail;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = require("nodemailer");

function sendEmail(_x, _x2) {
  return _sendEmail.apply(this, arguments);
}

function _sendEmail() {
  _sendEmail = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, reciever, subject, content, transporter, info;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("hello");
            _req$body = req.body, reciever = _req$body.reciever, subject = _req$body.subject, content = _req$body.content;
            console.log(req.body); // async..await is not allowed in global scope, must use a wrapper
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            // create reusable transporter object using the default SMTP transport

            transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              secure: true,
              port: 465,
              proxy: 'http://localhost:3000/',
              auth: {
                user: '',
                pass: ''
              }
            });
            transporter.verify(function (err, success) {
              if (err) console.error(err);
              console.log('Your config is correct');
            });
            console.log("proceding"); // send mail with defined transport object

            _context.next = 8;
            return transporter.sendMail({
              from: "moncefrejeb1996@gmail.com",
              // sender address
              to: reciever,
              // list of receivers
              subject: subject,
              // Subject line
              text: content // plain text body

            });

          case 8:
            info = _context.sent;
            console.log("proceding");
            res.json({
              "message": "Message sent"
            }); // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendEmail.apply(this, arguments);
}