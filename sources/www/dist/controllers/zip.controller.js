"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip_Code = zip_Code;
exports.unZip_Code = unZip_Code;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var archiver = require('archiver');

var zlib = require('zlib');

function zip_Code(_x, _x2) {
  return _zip_Code.apply(this, arguments);
}

function _zip_Code() {
  _zip_Code = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var output, archive;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // create a file to stream archive data to.
            output = fs.createWriteStream(__dirname + '/zipped/resultat.zip');
            archive = archiver('zip', {
              zlib: {
                level: 9
              } // Sets the compression level.

            }); // listen for all archive data to be written
            // 'close' event is fired only when a file descriptor is involved

            output.on('close', function () {
              console.log(archive.pointer() + ' total bytes');
              console.log('archiver has been finalized and the output file descriptor has closed.');
            });
            output.on('end', function () {
              console.log('Data has been drained');
            }); // good practice to catch warnings (ie stat failures and other non-blocking errors)

            archive.on('warning', function (err) {
              if (err.code === 'ENOENT') {// log warning
              } else {
                // throw error
                throw err;
              }
            }); // good practice to catch this error explicitly

            archive.on('error', function (err) {
              throw err;
            }); // pipe archive data to the file

            archive.pipe(output); // append files from a sub-directory and naming it `new-subdir` within the archive

            archive.directory('projects/project1', 'Project'); // finalize the archive (ie we are done appending files but streams have to finish yet)
            // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand

            archive.finalize();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _zip_Code.apply(this, arguments);
}

function unZip_Code(_x3, _x4) {
  return _unZip_Code.apply(this, arguments);
}

function _unZip_Code() {
  _unZip_Code = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var fileContents, writeStream, unzip;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileContents = fs.createReadStream(__dirname + '/zipped/resultat.zip');
            writeStream = fs.createWriteStream(__dirname + '/unzipped/Projet'); //  fileContents._readableState.buffer.head='content-encoding'
            // switch (response.headers['content-encoding']) {
            //   // or, just use zlib.createUnzip() to handle both cases
            //   case 'gzip':
            //     response.pipe(zlib.createGunzip()).pipe(output);
            //     break;
            //   case 'deflate':
            //     response.pipe(zlib.createInflate()).pipe(output);
            //     break;
            //   default:
            //     response.pipe(output);
            //     break;
            // }

            unzip = zlib.createGunzip();
            fileContents.pipe(unzip).pipe(writeStream);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _unZip_Code.apply(this, arguments);
}