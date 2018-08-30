'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uiManager = new function () {

    var cardArray = [];
    /**
     * search add delete edit 버튼
     */
    var $button = $('.button');

    $button.on('click', function () {
        var $this = $(this);
        var id = $this.attr('id');

        $('.input-content').addClass('display-none');
        $('.' + id).removeClass('display-none');
    });

    /**
     * initiation
     */
    webApi.getAllStudents().then(function (data) {
        if (data.success) {
            var students = data.body;

            var keys = Object.keys(students);

            // 모든 학생들을 모두 카드로 만든다.
            _.forEach(keys, function (key) {
                cardArray.push(new Card(students[key]));
            });
        }
    });

    /**
     * Search
     */
    var $searchSubmitButton = $('.search > .click-button');
    $searchSubmitButton.on('click', function () {
        var $this = $(this);
        var $input = $this.parent().find('input');
        var searchingName = $input.val();

        _.forEach(cardArray, function (card) {
            if (card.name === searchingName) {
                card.highlight();
            } else {
                card.deHighlight();
            }
        });

        $input.val('');
    });

    /**
     * Add
     */
    var $addSubmitButton = $('.add > .click-button');
    $addSubmitButton.on('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var $this, $inputs, jsonData, returnedJsonData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        $this = $(this);
                        $inputs = $this.parent().find('input');
                        jsonData = makeJson($inputs);
                        _context.next = 5;
                        return webApi.addStudent(jsonData);

                    case 5:
                        returnedJsonData = _context.sent;


                        if (returnedJsonData.success) {
                            cardArray.push(new Card(returnedJsonData.body));
                        }

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));

    var makeJson = function makeJson($inputs) {
        var json = {};
        for (var i = 0; i < $inputs.length; i++) {
            var $input = $($inputs[i]);
            json[$input.attr('key')] = $input.val();
        }
        return json;
    };

    /**
     * Delete
     */
    var $deleteSubmitButton = $('.delete > .click-button');
    $deleteSubmitButton.on('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var $this, $input, deletingName, returnedJsonData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        $this = $(this);
                        $input = $this.parent().find('input');
                        deletingName = $input.val();
                        _context2.next = 5;
                        return webApi.deleteStudent(deletingName);

                    case 5:
                        returnedJsonData = _context2.sent;


                        if (returnedJsonData.success) {
                            _.remove(cardArray, function (card) {
                                if (card.name === returnedJsonData.name) {
                                    card.remove();
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        }
                        $input.val('');

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    })));

    /**
     * Edit
     */
    var $editSubmitButton = $('.edit > .click-button');

    $editSubmitButton.on('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var $this, $inputs, jsonData, returnedJsonData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        $this = $(this);
                        $inputs = $this.parent().find('input');
                        jsonData = makeJson($inputs);
                        _context3.next = 5;
                        return webApi.editStudent(jsonData);

                    case 5:
                        returnedJsonData = _context3.sent;


                        if (returnedJsonData.success) {
                            _.forEach(cardArray, function (card) {
                                if (card.name === returnedJsonData.body.name) {
                                    card.updateInfo(returnedJsonData.body);
                                }
                            });
                        }

                        $inputs.each(function (index, input) {
                            $(input).val('');
                        });

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    })));

    /**
     * Card
     */
    var Card = function Card(data) {
        var $cardsZone = $('.main-content');
        var $template = $('<div class="card">\n                <div class="photo-content"><i class="fas fa-user-circle"></i></div>\n                <div class="profile-content">\n                    <div class="name">' + data.name + '</div>\n                    <div class="text age">' + data.age + '</div>\n                    <div class="text hobby">' + data.hobby + '</div>\n                    <div class="text food">' + data.food + '</div>\n                </div>\n            </div>');
        $cardsZone.append($template);

        this.name = data.name;

        this.remove = function () {
            $template.remove();
        };

        this.highlight = function () {
            // $template.css('background-color', 'red');
            $template.attr('highlighted', '');
        };
        this.deHighlight = function () {
            return $template.removeAttr('highlighted');
        };

        this.updateInfo = function (jsonData) {
            $template.find('.name').text('' + jsonData.name);
            $template.find('.age').text('' + jsonData.age);
            $template.find('.hobby').text('' + jsonData.hobby);
            $template.find('.food').text('' + jsonData.food);
        };
    };
}();