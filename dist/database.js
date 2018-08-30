'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient(6379, '127.0.0.1');

var databaseApi = new function () {

    this.searchStudent = function (findingName) {
        return new Promise(function (resolve, reject) {
            client.get(findingName, function (err, val) {
                // value is null when the key is missing
                if (!_.isNil(val)) {
                    resolve(val);
                } else {
                    reject(err);
                }
            });
        });
    };

    this.getAllStudents = function () {
        return new Promise(function (resolve, reject) {
            client.keys('*', function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, keys) {
                    var _this = this;

                    var usersJson, promises, userArray;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    usersJson = {};

                                    if (!err) {
                                        _context2.next = 3;
                                        break;
                                    }

                                    return _context2.abrupt('return', console.log(err));

                                case 3:
                                    if (!keys) {
                                        _context2.next = 12;
                                        break;
                                    }

                                    promises = _.map(keys, function () {
                                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return databaseApi.searchStudent(key);

                                                        case 2:
                                                            return _context.abrupt('return', _context.sent);

                                                        case 3:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this);
                                        }));

                                        return function (_x3) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }());
                                    _context2.next = 7;
                                    return Promise.all(promises);

                                case 7:
                                    userArray = _context2.sent;


                                    _.forEach(userArray, function (user) {
                                        var userJson = JSON.parse(user);
                                        usersJson[userJson.name] = userJson;
                                    });

                                    // console.log(usersJson);
                                    resolve(usersJson);
                                    _context2.next = 13;
                                    break;

                                case 12:
                                    reject(err);

                                case 13:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        });
    };

    this.addStudent = function (jsonData) {
        return new Promise(function (resolve, reject) {
            var key = jsonData.name;
            var value = JSON.stringify(jsonData);

            client.get(key, function (err, val) {
                // value is null when the key is missing
                if (_.isNil(val)) {
                    client.set(key, value);
                    resolve();
                } else reject(err);
            });
        });
    };

    this.deleteStudent = function (deletingName) {
        return new Promise(function (resolve, reject) {
            var key = deletingName;

            client.get(key, function (err, val) {
                if (!_.isNil(val)) {
                    client.del(key);
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    };

    this.editStudent = function (jsonData) {
        return new Promise(function (resolve, reject) {
            var key = jsonData.name;
            var value = jsonData;

            // console.log(key);
            // console.log(value);

            client.get(key, function (err, val) {
                if (!_.isNil(val)) {
                    client.set(key, value);
                } else {
                    reject(err);
                }
            });
        });
    };
}();

// async function test() {
//     console.log('hi');
//     await databaseApi.getAllStudents();
// }
//
// test();


module.exports = databaseApi;