//resources.onReady(init);

var sounds;
var music;

//initialize
var lastTime;
function init() {
    music = {
        overworld: new Audio('sounds/aboveground_bgm.ogg'),
        underground: new Audio('sounds/underground_bgm.ogg'),
        clear: new Audio('sounds/stage_clear.wav'),
        death: new Audio('sounds/mariodie.wav')
    };
    sounds = {
        smallJump: new Audio('sounds/jump-small.wav'),
        bigJump: new Audio('sounds/jump-super.wav'),
        breakBlock: new Audio('sounds/breakblock.wav'),
        bump: new Audio('sounds/bump.wav'),
        coin: new Audio('sounds/coin.wav'),
        fireball: new Audio('sounds/fireball.wav'),
        flagpole: new Audio('sounds/flagpole.wav'),
        kick: new Audio('sounds/kick.wav'),
        pipe: new Audio('sounds/pipe.wav'),
        itemAppear: new Audio('sounds/itemAppear.wav'),
        powerup: new Audio('sounds/powerup.wav'),
        stomp: new Audio('sounds/stomp.wav')
    };
}
