"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProject = createProject;
exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.getProjectByUserId = getProjectByUserId;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;

var _Project = _interopRequireDefault(require("../models/Project"));

var _Users = _interopRequireDefault(require("../models/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createProject(_x, _x2) {
  return _createProject.apply(this, arguments);
}

function _createProject() {
  _createProject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, priority, description, deliverydate, newProject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, priority = _req$body.priority, description = _req$body.description, deliverydate = _req$body.deliverydate;
            _context.prev = 1;
            _context.next = 4;
            return _Project["default"].create({
              name: name,
              priority: priority,
              description: description,
              deliverydate: deliverydate
            }, {
              fields: ['name', 'priority', 'description', 'deliverydate']
            });

          case 4:
            newProject = _context.sent;

            if (!newProject) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Project created successfully',
              data: newProject
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
  return _createProject.apply(this, arguments);
}

function getProjects(_x3, _x4) {
  return _getProjects.apply(this, arguments);
}

function _getProjects() {
  _getProjects = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var projects;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Project["default"].findAll();

          case 3:
            projects = _context2.sent;
            res.json({
              data: projects
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
  return _getProjects.apply(this, arguments);
}

function getProjectById(_x5, _x6) {
  return _getProjectById.apply(this, arguments);
}

function _getProjectById() {
  _getProjectById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, project;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _Project["default"].findOne({
              where: {
                id: id
              }
            });

          case 3:
            project = _context3.sent;

            if (!(project != null)) {
              _context3.next = 8;
              break;
            }

            res.json(project);
            _context3.next = 9;
            break;

          case 8:
            return _context3.abrupt("return", res.json({
              message: ' this project does not exist '
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getProjectById.apply(this, arguments);
}

function getProjectByUserId(_x7, _x8) {
  return _getProjectByUserId.apply(this, arguments);
}

function _getProjectByUserId() {
  _getProjectByUserId = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var UserId, user, projects;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            UserId = req.params.UserId;
            _context4.next = 3;
            return _Users["default"].findOne({
              attributes: ['id', 'name', 'profession', 'projectId'],
              where: {
                id: UserId
              }
            });

          case 3:
            user = _context4.sent;

            if (!(user == null)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'User does not exist'
            }));

          case 8:
            _context4.next = 10;
            return _Project["default"].findAll({
              attributes: ['name', 'description'],
              where: {
                id: user.projectId
              }
            });

          case 10:
            projects = _context4.sent;

            if (!(projects.length > 0)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.json(projects));

          case 15:
            return _context4.abrupt("return", res.json({
              message: ' that user is not working on any project '
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getProjectByUserId.apply(this, arguments);
}

function deleteProject(_x9, _x10) {
  return _deleteProject.apply(this, arguments);
}

function _deleteProject() {
  _deleteProject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, deleteRowCount;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _Project["default"].destroy({
              where: {
                id: id
              }
            });

          case 3:
            deleteRowCount = _context5.sent;
            res.json({
              message: 'Project deleted successfully',
              count: deleteRowCount
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deleteProject.apply(this, arguments);
}

function updateProject(_x11, _x12) {
  return _updateProject.apply(this, arguments);
}

function _updateProject() {
  _updateProject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _req$body2, name, priority, description, deliverydate, projects;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, priority = _req$body2.priority, description = _req$body2.description, deliverydate = _req$body2.deliverydate;
            _context7.next = 4;
            return _Project["default"].findAll({
              attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
              where: {
                id: id
              }
            });

          case 4:
            projects = _context7.sent;

            if (projects.length > 0) {
              projects.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee6(project) {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return project.update({
                            name: name,
                            priority: priority,
                            description: description,
                            deliverydate: deliverydate
                          });

                        case 2:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x13) {
                  return _ref.apply(this, arguments);
                };
              }());
            }

            return _context7.abrupt("return", res.json({
              message: 'Project Updated successfully',
              data: projects
            }));

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _updateProject.apply(this, arguments);
}