'use strict';

$.put = function (url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = {};
    }
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
};
$.delete = function (url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = {};
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    });
};

var webApi = new function () {

    this.getAllStudents = function () {
        return new Promise(function (resolve, reject) {
            $.get('/users', function (data) {
                resolve(data);
            }, "json");
        });
    };

    this.addStudent = function (jsonData) {
        return new Promise(function (resolve, reject) {
            $.post('/user', jsonData, function (data) {
                resolve(data);
            }, "json");
        });
    };

    this.deleteStudent = function (deletingName) {
        return new Promise(function (resolve, reject) {
            $.delete('/user/' + deletingName, function (data) {
                resolve(data);
            }, "json");
        });
    };
}();