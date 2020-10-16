"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Users = _database.sequelize.define('users', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: {
    type: _sequelize["default"].TEXT
  },
  login: {
    type: _sequelize["default"].TEXT
  },
  profession: {
    type: _sequelize["default"].TEXT
  },
  projectId: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false
});

var _default = Users;
exports["default"] = _default;