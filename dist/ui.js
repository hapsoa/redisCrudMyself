'use strict';

var uiManager = new function () {

    var $button = $('.button');

    $button.on('click', function () {
        var $this = $(this);
        var id = $this.attr('id');

        $('.input-content').addClass('display-none');
        $('.' + id).removeClass('display-none');
    });

    // $('.click-button').on('click', function (e) {
    //   const $this = $(this);
    //   const inputArray = $this.parent().find('input');
    //   console.log(makeJson(inputArray));
    //   // console.log($(inputArray).val());
    //
    //
    // });

    /**
     * Add
     */
    var $addSubmitButton = $('.add > .click-button');

    $addSubmitButton.on('click', function () {
        var name = $('input[key="name"]').val();
        var hobby = $('input[key="hobby"]').val();
        var age = $('input[key="age"]').val();
        var food = $('input[key="food"]').val();
        webApi.createStudent(name, hobby, age, food);
    });

    var makeJson = function makeJson(array) {
        var json = {};

        for (var i = 0; i < array.length; i++) {
            json[$(array[i]).attr('key')] = $(array[i]).val();
        }

        return json;
    };

    var Card = function Card(data) {

        var $cardsZone = $('.main-content');

        var template = '<div class="card">\n                <div class="photo-content"><i class="fas fa-user-circle"></i></div>\n                <div class="profile-content">\n                    <div class="name">\uC774\uC218\uC815</div>\n                    <div class="text age">22</div>\n                    <div class="text hobby">\uC74C\uC545\uAC10\uC0C1</div>\n                    <div class="text food">\uD30C\uC2A4\uD0C0</div>\n                </div>\n            </div>';

        $cardsZone.append(template);
    };
}();