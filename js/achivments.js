const greets = ['WOW!', 'AMAZING!', 'OMG!', 'Oh My God!!', 'You are the best!', 'That is great.', 'YAY!', 'WOOHOO!','Tada!'];
const animations = ['jello', 'wobble', 'tada', 'swing'];
const achievementPlaysounds = [sounds.Achievment1,sounds.Achievment2,sounds.Achievment3];

var i = 0;
let acheivementPlaceholder;

let sec10interval;
let sec30interval;
let sec50interval;
let sec60interval;
let sec90interval;

let givenAchivements = [];

const achievement = {
    READABILITY: { Heading: 'Read ability', Paragraph: 'You have unlocked to ability to read an achievement', emoji: '✉' },
    READY: { Heading: 'Ready', Paragraph: 'You have unlocked to ability to be ready', emoji: '👍'},
    LEFTCLICK: { Heading: 'LeftClick', Paragraph: 'YAY! You can click the left click!', emoji: '👆' },
    RIGHTCLICK: { Heading: 'RightClick', Paragraph: 'You have mastered the art of raising your finger from the right mouse button', emoji: '👈' },
    MIDDLECLICK: { Heading: 'Middle man', Paragraph: 'You have mastered the art of raising your finger from the middle wheel mouse button', emoji: '☸' },
    DRAG1: { Heading: 'Oh the DRAG', Paragraph: 'You actually managed to drag an item', emoji: '↖' },
    DRAG2: { Heading: 'Oh the DROP', Paragraph: 'You actually managed to drop an item into the fridge', emoji: '↙' },
    ENTEPRENUR: { Heading: 'Enteprenur', Paragraph: 'You managed to click the start button', emoji: '🦄' },
    SMILE: { Heading: 'Y so serious?', Paragraph: 'You were smiling!', emoji: '😆' },
    STAGE2: { Heading: 'MAKE SOME NOIZ', Paragraph: 'You started stage 2 of the game.', emoji: '🔊' },
    STAGE3: { Heading: 'Time to remember', Paragraph: 'You started stage 3 of the game.', emoji: '⏲' },
    POT: { Heading: 'What\'s in the pot?', Paragraph: 'You picked the pot!', emoji: '🍲' },
    BEGIN: { Heading: 'And so it begins', Paragraph: 'You started fixing up the mess', emoji: '🔰' },
    FIXER: { Heading: 'Fixer', Paragraph: 'You fixed the game!', emoji: '🛠' },
    END_100: { Heading: 'Repairer', Paragraph: 'You ordered 100% of the fridge', emoji: '🔧' },
    END_80: { Heading: 'Paragon', Paragraph: 'You ordered 80% of the fridge', emoji: '👼' },
    END_50: { Heading: 'True neutral', Paragraph: 'You ordered 50% of the fridge', emoji: '😐' },
    END_30: { Heading: 'PULL!', Paragraph: 'You ordered 30% of the fridge', emoji: '🙄' },
    END_20: { Heading: 'Almost nothing done', Paragraph: 'You ordered 20% of the fridge', emoji: '⛔' },
    END_0: { Heading: 'Ghost', Paragraph: 'You ordered 0% of the fridge', emoji: '👻' },
    POTATO: { Heading: 'POTATO', Paragraph: 'High in carps', emoji: '🍠' },
    CRAP: { Heading: 'OH CRAP', Paragraph: 'Shit just hit the fan!', emoji: '💩' },
    SEC_30: { Heading: 'Eye relief', Paragraph: 'You have avoided netflix for 30 seconds', emoji: '👀' },
    SEC_60: { Heading: 'No need to pee', Paragraph: '60 seconds without a pee break!', emoji: '🚽' },
    SEC_90: { Heading: 'Frigidaire', Paragraph: '90 seconds of happy fridge time', emoji: '🍨' }
};

function setTimeoutAchievements() {
    sec10interval = setTimeout(function () { createAchievementDiv(achievement.CRAP) }, 10000);
    sec30interval = setTimeout(function () { createAchievementDiv(achievement.SEC_30) }, 30000);
    sec50interval = setTimeout(function () { createAchievementDiv(achievement.SMILE) }, 50000);
    sec60interval = setTimeout(function () { createAchievementDiv(achievement.SEC_60) }, 60000);
    sec70interval = setTimeout(function () { createAchievementDiv(achievement.POTATO) }, 70000);
    sec90interval = setTimeout(function () { createAchievementDiv(achievement.SEC_90) }, 90000);
    givenAchivements = [];
}

function stopTimeoutAchievements() {
    clearTimeout(sec10interval);
    clearTimeout(sec30interval);
    clearTimeout(sec50interval);
    clearTimeout(sec60interval);
    clearTimeout(sec70interval);
    clearTimeout(sec90interval);

}

var achivementsAsArray = [achievement.BEGIN, achievement.DRAG1, achievement.DRAG2, achievement.END_0, achievement.END_20];

function setNextAchievement() {

    i++;
    if (i >= achivementsAsArray.length) {
        i = 0;
    }

    createAchievementDiv(achivementsAsArray[i]);
}

function removeAchievement() {
    const acheivementPlaceholder = document.querySelector('.modal-window');
    acheivementPlaceholder.parentElement.removeChild(acheivementPlaceholder);
}

function createAchievementDiv(achievement) {

    const curachievement = givenAchivements.find(a => a.Heading === achievement.Heading);
    if (curachievement) {
        console.log(`Skipping achievments ${achievement.Heading} - it was already given...`)
        return;
    }

    givenAchivements.push(achievement);

    greet = greets[Math.floor(Math.random() * greets.length)];
    animation = animations[Math.floor(Math.random() * animations.length)];
    playsound = achievementPlaysounds[Math.floor(Math.random() * achievementPlaysounds.length)];

    const newAchievementElement =
        `<div class="modal-window ${animation} animated" onclick="removeAchievement()">
        <h1>${achievement.Heading} Achievement!</h1>
        <p>${greet} ${achievement.Paragraph}</p>
        <div style="font-size: 10em;">${achievement.emoji}</div>
        </div>`;

    const acheivementPlaceholder = document.getElementById("acheivementPlaceholder");
    playsound.play();
    acheivementPlaceholder.innerHTML = newAchievementElement;
}

function createAchievementCertificate() {
    stopTimeoutAchievements();
    var certificate = '';
    certificate += '<div class="modal-window fadeInDownBig animated" onclick="removeAchievement()">';
    certificate += '<h1> A Certificate Of Completion</h1>';
    certificate += '<h2> Is proudly presented to player x </h2>';
    certificate += '<h2> With the following achievements: </h2>';
    certificate += '<ul style="columns: 2">';
    givenAchivements.forEach(element => {
        certificate += `<li>${element.emoji} - ${element.Heading}</li>`;
    });
    certificate += '</ul>';
    certificate += `<h3> You received ${givenAchivements.length} of 40 achivements available </h3>`;
    certificate += '</div>';
    const acheivementPlaceholder = document.getElementById("acheivementPlaceholder");
    sounds.WOWCROWD.play();
    acheivementPlaceholder.innerHTML = certificate;
}

