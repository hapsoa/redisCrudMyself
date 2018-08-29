'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient(6379, '127.0.0.1');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'API SERVER' });
});

router.get('/test', function (req, res, next) {
    res.render('layout', { title: 'API SERVER' });
});

router.post('/user', function (req, res) {

    var key = req.body.name;
    var value = JSON.stringify(req.body);

    client.get(key, function (err, val) {
        // err 처리 -> 에러는 아마 404 이런 거 말하는 것 같음
        // value is null when the key is missing
        if (_.isNil(val)) {
            client.set(key, value);
            // client.set(key, value, (err) => {});
            res.send('Success: Add User.');
        } else res.send('Fail: User Already Exists.');
    });
});

// params
router.get('/user/:name', function (req, res) {

    client.get(req.params.name, function (err, val) {
        // err 처리 -> 에러는 아마 404 이런 거 말하는 것 같음
        // value is null when the key is missing
        _.isNil(val) ? res.send('Fail: User Not Found') : res.json(val);
    });
});

router.get('/users', function (req, res) {

    client.keys('*', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, keys) {
            var users, i;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            users = {};

                            if (!err) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', console.log(err));

                        case 3:
                            if (!keys) {
                                _context.next = 14;
                                break;
                            }

                            i = 0;

                        case 5:
                            if (!(i < keys.length)) {
                                _context.next = 12;
                                break;
                            }

                            _context.next = 8;
                            return makePromise(keys[i]);

                        case 8:
                            users['' + keys[i]] = _context.sent;

                        case 9:
                            i++;
                            _context.next = 5;
                            break;

                        case 12:
                            console.log('users', users);
                            res.json(users);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
});

var makePromise = function makePromise(key) {
    return new Promise(function (resolve, reject) {
        client.get(key, function (error, value) {
            if (error) return console.log(error);

            resolve(value);
        });
    });
};

// 덮어 쓰기
router.put('/user', function (req, res) {

    var key = req.body.name;
    var value = JSON.stringify(req.body);

    console.log(key);
    console.log(value);

    client.get(key, function (err, val) {
        if (_.isNil(val)) {
            res.send('Fail: User Not Found.');
        } else {
            client.set(key, value);
            res.send('Success: Edit User.');
        }
    });
});

// 삭제하기
router.delete('/user/:name', function (req, res) {

    var key = req.params.name;

    client.get(key, function (err, val) {
        if (_.isNil(val)) {
            res.send('Fail: User Not Found.');
        } else {
            client.del(key);
            res.send('Success: Delete User.');
        }
    });
});

module.exports = router;