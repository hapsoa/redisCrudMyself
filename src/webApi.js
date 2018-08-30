$.put = function (url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = {}
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
        data = {}
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    });
};

const webApi = new function () {

    this.getAllStudents = () => {
        return new Promise((resolve, reject) => {
            $.get('/users', function (data) {
                resolve(data);
            }, "json");
        });
    };

    this.addStudent = (jsonData) => {
        return new Promise((resolve, reject) => {
            $.post('/user', jsonData, function (data) {
                resolve(data);
            }, "json");
        });
    };

    this.deleteStudent = (deletingName) => {
        return new Promise((resolve, reject) => {
            $.delete(`/user/${deletingName}`, function (data) {
                resolve(data);
            }, "json");
        });
    };

    this.editStudent = (jsonData) => {
        return new Promise((resolve, reject) => {

            // $.put('/user', jsonData, function (data) {
            //     resolve(data);
            // }, "json");

            $.put('/user', jsonData, function(data) {
                resolve(data);
            });
        });
    };

};


// function test() {
//     webApi.editStudent({name: 'good'});
// }
//
// test();