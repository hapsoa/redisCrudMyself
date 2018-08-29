const express = require('express');
const router = express.Router();
const databaseApi = require('../dist/database');
require('babel-polyfill');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('layout');
});


// router.get('/user')

router.get('/users', async function (req, res) {
    try {
        const studentsData = await databaseApi.getAllStudents();
        res.json({
            success: true,
            body: studentsData
        });
    } catch (error) {
        res.json({
            success: false
        });
    }
});

router.post('/user', async (req, res) => {
    try {
        await databaseApi.addStudent(req.body);
        res.json({
            success: true,
            body: req.body
        })
    } catch (error) {
        res.json({
            success: false,
            body: req.body
        })
    }
});

router.delete('/user/:name', async (req, res) => {
    try {
        await databaseApi.deleteStudent(req.params.name);
        res.json({
            success: true,
            name: req.params.name
        })
    } catch (error) {
        res.json({
            success: false,
            name: req.params.name
        })
    }
});


module.exports = router;
