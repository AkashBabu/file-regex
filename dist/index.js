'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var search = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(







    function _callee2(dir, regex, depth) {var result = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var fileAnalyzer = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
            function _callee(file) {var filePath, stat;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                                filePath = _path2.default.join(dir, file);_context.next = 3;return (
                                    fs_stat(filePath));case 3:stat = _context.sent;if (!(





                                stat.isFile() && regex.test(regex.global ? filePath : file))) {_context.next = 8;break;}
                                result.push({ dir: dir, file: file });_context.next = 11;break;case 8:if (!(
                                stat.isDirectory() && depth > 0)) {_context.next = 11;break;}_context.next = 11;return (
                                    search(filePath, regex, depth - 1, result, concurrency));case 11:


                                // reset the lastIndex for the regex
                                // to run the match from the beginning of the
                                // string (filePath)
                                regex.lastIndex = 0;case 12:case 'end':return _context.stop();}}}, _callee, this);}));return function fileAnalyzer(_x5) {return _ref2.apply(this, arguments);};}();var concurrency = arguments[4];var folderContents;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (


                            fs_readDir(dir));case 2:folderContents = _context2.sent;return _context2.abrupt('return',
                        (0, _libPromisePool2.default)(folderContents, fileAnalyzer, concurrency));case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));return function search(_x2, _x3, _x4) {return _ref.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                                       * @typedef {Object[]} Result
                                                                                                                                                                                                                                                       * @property {string} dir
                                                                                                                                                                                                                                                       * @property {string} file
                                                                                                                                                                                                                                                       */

/**
                                                                                                                                                                                                                                                           * Searches for files matching the given pattern
                                                                                                                                                                                                                                                           * @param {string} baseDir Base directory
                                                                                                                                                                                                                                                           * @param {RegExp|String} pattern Regexp pattern
                                                                                                                                                                                                                                                           * @param {Number} depth Number of recursions into the directory for file search
                                                                                                                                                                                                                                                           * @param {Object} options
                                                                                                                                                                                                                                                           * @param {number} options.concurrency Number of concurrent folder searches
                                                                                                                                                                                                                                                           *
                                                                                                                                                                                                                                                           * @return {Promise.<Result>}
                                                                                                                                                                                                                                                           */var FindFiles = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee3() {var baseDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _path2.default.resolve('../../');var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.*';var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var _options$concurrency, concurrency, result;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_options$concurrency =
                        options.concurrency, concurrency = _options$concurrency === undefined ? 10 : _options$concurrency;

                        result = [];_context3.t0 =
                        depth > -1;if (!_context3.t0) {_context3.next = 6;break;}_context3.next = 6;return search(_path2.default.resolve(baseDir), typeof pattern === 'string' ? new RegExp(pattern) : pattern, depth, result, concurrency);case 6:return _context3.abrupt('return',
                        result);case 7:case 'end':return _context3.stop();}}}, _callee3, this);}));return function FindFiles() {return _ref3.apply(this, arguments);};}();var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);var _path = require('path');var _path2 = _interopRequireDefault(_path);var _util = require('util');var _libPromisePool = require('lib-promise-pool');var _libPromisePool2 = _interopRequireDefault(_libPromisePool);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var fs_readDir = (0, _util.promisify)(_fs2.default.readdir);var fs_stat = (0, _util.promisify)(_fs2.default.stat);


module.exports = FindFiles;