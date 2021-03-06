const express = require('express');
const router = express.Router();
const redis = require('redis');
const _ = require('lodash');
const client = redis.createClient(6379, '127.0.0.1');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'API SERVER'});
});

router.get('/test', function (req, res, next) {
    res.render('layout', {title: 'API SERVER'});
});

router.post('/user', (req, res) => {

    let key = req.body.name;
    let value = JSON.stringify(req.body);

    client.get(key, (err, val) => {
        // err 처리 -> 에러는 아마 404 이런 거 말하는 것 같음
        // value is null when the key is missing
        if (_.isNil(val)) {
            client.set(key, value);
            // client.set(key, value, (err) => {});
            res.send('Success: Add User.');
        }
        else res.send('Fail: User Already Exists.');
    });
});


// params
router.get('/user/:name', (req, res) => {

    client.get(req.params.name, (err, val) => {
        // err 처리 -> 에러는 아마 404 이런 거 말하는 것 같음
        // value is null when the key is missing
        _.isNil(val) ? res.send('Fail: User Not Found') : res.json(val);
    });
});



router.get('/users', function (req, res) {

    client.keys('*', async function (err, keys) {
        const users = {};

        if (err) return console.log(err);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                users[`${keys[i]}`] = await makePromise(keys[i]);
            }
            console.log('users',users);
            res.json(users);
        }
    });
});

const makePromise = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, function (error, value) {
            if (error) return console.log(error);

            resolve(value);
        });
    });
};

// 덮어 쓰기
router.put('/user', (req, res) => {

    let key = req.body.name;
    let value = JSON.stringify(req.body);

    console.log(key);
    console.log(value);

    client.get(key, (err, val) => {
        if (_.isNil(val)) {
            res.send('Fail: User Not Found.');
        }
        else {
            client.set(key, value);
            res.send('Success: Edit User.');
        }
    });
});


// 삭제하기
router.delete('/user/:name', (req, res) => {

    let key = req.params.name;

    client.get(key, (err, val) => {
        if (_.isNil(val)) {
            res.send('Fail: User Not Found.');
        }
        else {
            client.del(key);
            res.send('Success: Delete User.');
        }
    });

});

module.exports = router;
