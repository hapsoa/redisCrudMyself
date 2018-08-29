const uiManager = new function () {

    const $button = $('.button');

    $button.on('click', function () {
        const $this = $(this);
        const id = $this.attr('id');

        $('.input-content').addClass('display-none');
        $(`.${id}`).removeClass('display-none');
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
    const $addSubmitButton = $('.add > .click-button');

    $addSubmitButton.on('click', function() {
        const name = $('input[key="name"]').val();
        const hobby = $('input[key="hobby"]').val();
        const age = $('input[key="age"]').val();
        const food = $('input[key="food"]').val();
        webApi.createStudent(name, hobby, age, food);
    });


    const makeJson = function (array) {
        const json = {};

        for (let i = 0; i < array.length; i++) {
            json[$(array[i]).attr('key')] = $(array[i]).val();
        }

        return json;
    };

    const Card = function (data) {

        const $cardsZone = $('.main-content');

        const template = `<div class="card">
                <div class="photo-content"><i class="fas fa-user-circle"></i></div>
                <div class="profile-content">
                    <div class="name">이수정</div>
                    <div class="text age">22</div>
                    <div class="text hobby">음악감상</div>
                    <div class="text food">파스타</div>
                </div>
            </div>`;

        $cardsZone.append(template);

    };

};