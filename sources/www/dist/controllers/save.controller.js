"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fictive_Save = fictive_Save;
exports.get_And_Save_Code = get_And_Save_Code;
exports.show_Code = show_Code;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

function fictive_Save(_x, _x2) {
  return _fictive_Save.apply(this, arguments);
}

function _fictive_Save() {
  _fictive_Save = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, code, path;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, code = _req$body.code, path = _req$body.path;
            console.log(code);
            console.log(path);

            try {
              fs.writeFile("fictiveProjects/" + path, code, function (err) {
                if (err) {
                  return console.log(err);
                }

                console.log("The file was saved fictively!");
              });
              res.json({
                "code": code
              });
            } catch (e) {
              console.log(e);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fictive_Save.apply(this, arguments);
}

function get_And_Save_Code(_x3, _x4) {
  return _get_And_Save_Code.apply(this, arguments);
}

function _get_And_Save_Code() {
  _get_And_Save_Code = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, code, path;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, code = _req$body2.code, path = _req$body2.path; //console.log(code);

            console.log(path);

            try {
              fs.writeFile(path, code, function (err) {
                if (err) {
                  return console.log(err);
                }

                console.log("The file was saved !");
              });
              res.json({
                "code": code
              });
            } catch (e) {
              console.log(e);
            }

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _get_And_Save_Code.apply(this, arguments);
}

function show_Code(_x5, _x6) {
  return _show_Code.apply(this, arguments);
}

function _show_Code() {
  _show_Code = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var new_path, did_Something_Changed, contents, virtual_contents;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            new_path = req.body.new_path;
            did_Something_Changed = true;

            try {
              console.log(new_path);
              contents = fs.readFileSync(new_path, 'utf8');
              virtual_contents = fs.readFileSync("fictiveProjects/" + new_path, 'utf8'); // console.log(virtual_contents.length);
              // console.log(contents.length);
              // console.log(virtual_contents==contents);

              if (contents.localeCompare(virtual_contents) == 0) {
                console.log("nothing");
                did_Something_Changed = false;
              } // console.log("verification done");


              console.log(did_Something_Changed);
              res.json({
                "variation": did_Something_Changed,
                "code": virtual_contents
              });
            } catch (e) {
              console.log(e);
            }

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _show_Code.apply(this, arguments);
}