const uiManager = new function () {

    const cardArray = [];
    /**
     * search add delete edit 버튼
     */
    const $button = $('.button');

    $button.on('click', function () {
        const $this = $(this);
        const id = $this.attr('id');

        $('.input-content').addClass('display-none');
        $(`.${id}`).removeClass('display-none');
    });


    /**
     * initiation
     */
    webApi.getAllStudents().then((data) => {
        if (data.success) {
            const students = data.body;

            const keys = Object.keys(students)

            // 모든 학생들을 모두 카드로 만든다.
            _.forEach(keys, (key) => {
                cardArray.push(new Card(students[key]));
            });

        }

    });

    /**
     * Search
     */
    const $searchSubmitButton = $('.search > .click-button');
    $searchSubmitButton.on('click', function() {
        const $this = $(this);
        const $input = $this.parent().find('input');
        const searchingName = $input.val();

        _.forEach(cardArray, (card) => {
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
    const $addSubmitButton = $('.add > .click-button');
    $addSubmitButton.on('click', async function() {
        const $this = $(this);
        const $inputs = $this.parent().find('input');
        const jsonData = makeJson($inputs);

        const returnedJsonData = await webApi.addStudent(jsonData);

        if(returnedJsonData.success) {
            cardArray.push(new Card(returnedJsonData.body));
        }
        else {
            console.log('이미 존재하는 학생입니다.');
        }

    });

    const makeJson = function ($inputs) {
        const json = {};
        for (let i = 0; i < $inputs.length; i++) {
            const $input = $($inputs[i]);
            json[$input.attr('key')] = $input.val();
        }
        return json;
    };

    /**
     * Delete
     */
    const $deleteSubmitButton = $('.delete > .click-button');
    $deleteSubmitButton.on('click', async function() {
        const $this = $(this);
        const $input = $this.parent().find('input');
        const deletingName = $input.val();

        const returnedJsonData = await webApi.deleteStudent(deletingName);

        if (returnedJsonData.success) {
            _.remove(cardArray, (card) => {
                if (card.name === returnedJsonData.name) {
                    card.remove();
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        $input.val('');
    });

    /**
     * Edit
     */
    const $editSubmitButton = $('.edit > .click-button');

    $editSubmitButton.on('click', async function() {
        const $this = $(this);
        const $inputs = $this.parent().find('input');
        const jsonData = makeJson($inputs);

        const returnedJsonData = await webApi.editStudent(jsonData);

        if(returnedJsonData.success) {
            _.forEach(cardArray, (card) => {
                if (card.name === returnedJsonData.body.name) {
                    card.updateInfo(returnedJsonData.body);
                }
            });
        }

        $inputs.each((index, input) => {
            $(input).val('');
        });
    });


    /**
     * Card
     */
    const Card = function (data) {
        const $cardsZone = $('.main-content');
        const $template = $(`<div class="card">
                <div class="photo-content"><i class="fas fa-user-circle"></i></div>
                <div class="profile-content">
                    <div class="name">${data.name}</div>
                    <div class="text age">${data.age}</div>
                    <div class="text hobby">${data.hobby}</div>
                    <div class="text food">${data.food}</div>
                </div>
            </div>`);
        $cardsZone.append($template);

        this.name = data.name;

        this.remove = () => {
            $template.remove();
        };

        this.highlight = () => {
            // $template.css('background-color', 'red');
            $template.attr('highlighted', '');
        };
        this.deHighlight = () => $template.removeAttr('highlighted');

        this.updateInfo = (jsonData) => {
            $template.find('.name').text(`${jsonData.name}`);
            $template.find('.age').text(`${jsonData.age}`);
            $template.find('.hobby').text(`${jsonData.hobby}`);
            $template.find('.food').text(`${jsonData.food}`);
        } ;

    };

};