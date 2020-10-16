"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUsersByProject = getUsersByProject;
exports.getUserById = getUserById;
exports.getUserByName = getUserByName;
exports.getUserByLogin = getUserByLogin;
exports.deleteUser = deleteUser;
exports.deleteUserFromProject = deleteUserFromProject;
exports.updateUser = updateUser;

var _Users = _interopRequireDefault(require("../models/Users"));

var _Project = _interopRequireDefault(require("../models/Project"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, login, profession, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, login = _req$body.login, profession = _req$body.profession;
            _context.prev = 1;
            _context.next = 4;
            return _Users["default"].create({
              name: name,
              login: login,
              profession: profession
            }, {
              fields: ['name', 'login', 'profession']
            });

          case 4:
            newUser = _context.sent;

            if (!newUser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'User created successfully',
              data: newUser
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              message: 'something went wrong',
              data: {}
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createUser.apply(this, arguments);
}

function getUsers(_x3, _x4) {
  return _getUsers.apply(this, arguments);
}

function _getUsers() {
  _getUsers = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Users["default"].findAll();

          case 3:
            users = _context2.sent;
            res.json({
              data: users
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getUsers.apply(this, arguments);
}

function getUsersByProject(_x5, _x6) {
  return _getUsersByProject.apply(this, arguments);
}

function _getUsersByProject() {
  _getUsersByProject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var projectId, ProjectUsers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            projectId = req.params.projectId;
            _context3.next = 3;
            return _Users["default"].findAll({
              attributes: ['name', 'profession', 'projectId'],
              where: {
                projectId: projectId
              }
            });

          case 3:
            ProjectUsers = _context3.sent;

            if (!(ProjectUsers.length > 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json(ProjectUsers));

          case 8:
            res.json({
              message: 'that project does not exist'
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getUsersByProject.apply(this, arguments);
}

function getUserById(_x7, _x8) {
  return _getUserById.apply(this, arguments);
}

function _getUserById() {
  _getUserById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _Users["default"].findOne({
              where: {
                id: id
              }
            });

          case 3:
            user = _context4.sent;

            if (!(user != null)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json(user));

          case 8:
            return _context4.abrupt("return", res.json({
              message: 'User does not exist '
            }));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getUserById.apply(this, arguments);
}

function getUserByName(_x9, _x10) {
  return _getUserByName.apply(this, arguments);
}

function _getUserByName() {
  _getUserByName = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var name, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            name = req.params.name;
            _context5.next = 3;
            return _Users["default"].findOne({
              where: {
                name: name
              }
            });

          case 3:
            user = _context5.sent;

            if (!(user != null)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.json(user));

          case 8:
            return _context5.abrupt("return", res.json({
              message: 'User does not exist '
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getUserByName.apply(this, arguments);
}

function getUserByLogin(_x11, _x12) {
  return _getUserByLogin.apply(this, arguments);
}

function _getUserByLogin() {
  _getUserByLogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var login, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            login = req.body.login;
            _context6.next = 3;
            return _Users["default"].findOne({
              where: {
                login: login
              }
            });

          case 3:
            user = _context6.sent;

            if (!(user != null)) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.redirect('/home.html'));

          case 8:
            return _context6.abrupt("return", res.json({
              message: 'User does not exist '
            }));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getUserByLogin.apply(this, arguments);
}

function deleteUser(_x13, _x14) {
  return _deleteUser.apply(this, arguments);
}

function _deleteUser() {
  _deleteUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id, deleteRowCount;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _Users["default"].destroy({
              where: {
                id: id
              }
            });

          case 3:
            deleteRowCount = _context7.sent;
            res.json({
              message: 'User deleted successfully',
              count: deleteRowCount
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _deleteUser.apply(this, arguments);
}

function deleteUserFromProject(_x15, _x16) {
  return _deleteUserFromProject.apply(this, arguments);
}

function _deleteUserFromProject() {
  _deleteUserFromProject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _deleteUserFromProject.apply(this, arguments);
}

function updateUser(_x17, _x18) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var id, _req$body2, name, login, profession, projectId, users;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, login = _req$body2.login, profession = _req$body2.profession, projectId = _req$body2.projectId;
            _context10.next = 4;
            return _Users["default"].findAll({
              attributes: ['id', 'name', 'login', 'profession', 'projectId'],
              where: {
                id: id
              }
            });

          case 4:
            users = _context10.sent;

            if (users.length > 0) {
              users.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee9(user) {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return user.update({
                            name: name,
                            login: login,
                            profession: profession,
                            projectId: projectId
                          });

                        case 2:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x19) {
                  return _ref.apply(this, arguments);
                };
              }());
            }

            return _context10.abrupt("return", res.json({
              message: 'User Updated successfully',
              data: users
            }));

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _updateUser.apply(this, arguments);
}