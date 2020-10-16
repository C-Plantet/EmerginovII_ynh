"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFile = getFile;
exports.create_DirectoryOrFile = create_DirectoryOrFile;
exports.update_DirectoryOrFile = update_DirectoryOrFile;
exports.delete_DirectoryOrFile = delete_DirectoryOrFile;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dirTree = require("directory-tree");

var fs = require('fs');

function getFile(_x, _x2) {
  return _getFile.apply(this, arguments);
}

function _getFile() {
  _getFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var tree;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tree = dirTree("projects");
            tree = JSON.parse(JSON.stringify(tree).replace(/"name":/g, "\"text\":"));

            try {
              res.json(tree);
            } catch (e) {
              console.log(e);
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFile.apply(this, arguments);
}

function create_DirectoryOrFile(_x3, _x4) {
  return _create_DirectoryOrFile.apply(this, arguments);
}

function _create_DirectoryOrFile() {
  _create_DirectoryOrFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, path, type, directory, file;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, path = _req$body.path, type = _req$body.type;

            if (type == "folder") {
              directory = fs.mkdir(path, {
                recursive: true
              }, function (err) {
                if (err) throw err;
              });
            } else {
              file = fs.open(path, 'w', function (err) {
                if (err) throw err;
              });
            } //var data=fs.readFileSync('./public/home.html','utf-8');


            res.json({
              message: 'done'
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create_DirectoryOrFile.apply(this, arguments);
}

function update_DirectoryOrFile(_x5, _x6) {
  return _update_DirectoryOrFile.apply(this, arguments);
}

function _update_DirectoryOrFile() {
  _update_DirectoryOrFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, old_path, new_path, directoryOrFile;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, old_path = _req$body2.old_path, new_path = _req$body2.new_path;
            console.log("renaming");
            directoryOrFile = fs.rename(old_path, new_path, function (err) {
              if (err) throw err;
              console.log('Rename complete!');
            }); //var data=fs.readFileSync('./public/home.html','utf-8');

            res.json({
              message: 'done'
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update_DirectoryOrFile.apply(this, arguments);
}

function delete_DirectoryOrFile(_x7, _x8) {
  return _delete_DirectoryOrFile.apply(this, arguments);
}

function _delete_DirectoryOrFile() {
  _delete_DirectoryOrFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body3, type, path;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, type = _req$body3.type, path = _req$body3.path;

            if (type == "folder") {
              console.log(path); //rimraf(path, function () { console.log("delete done"); });

              fs.rmdir(path, {
                recursive: true
              }, function (err) {
                if (err) throw err;
                console.log("folder successfully deleted");
              });
            } else {
              fs.unlink(path, function (err) {
                if (err) throw err;
                console.log("file successfully deleted");
              });
            } //var data=fs.readFileSync('./public/home.html','utf-8');


            res.json({
              message: 'done'
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _delete_DirectoryOrFile.apply(this, arguments);
}