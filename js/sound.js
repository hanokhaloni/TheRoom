//resources.onReady(init);

var sounds;
var music;

//initialize
var lastTime;
function init() {
    music = {
        //overworld: new Audio('sounds/aboveground_bgm.ogg'),

    };
    sounds = {
        Achievment1: new Audio('sounds/Acheivment_1.ogg'),
        Achievment2: new Audio('sounds/Acheivment_2.ogg'),
        Achievment3: new Audio('sounds/Acheivment_3.ogg'),
        Door1: new Audio('sounds/Door_1.ogg'),
        Door2: new Audio('sounds/Door_2.ogg'),
        Door3: new Audio('sounds/Door_3.ogg'),
        WOWCROWD: new Audio('sounds/437645__dersuperanton__crowd-wow-surprise-people.wav')

    };

    console.log('Sounds inittialized!');
}

init();