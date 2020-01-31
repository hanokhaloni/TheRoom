const greets = ['WOW!', 'AMAZING!', 'OMG!', 'Oh My God!!', 'You are AMAZING!', 'That is great.', 'YAY!', 'WOOHOO!'];
const animations = ['jello', 'wobble', 'tada', 'swing'];
let acheivementPlaceholder;
let i = 0;

const achievement = [
    { Heading: 'Read ability', Paragraph: 'You have unlocked to ability to read an achievement', emoji: '✉' },
    { Heading: 'LeftClick', Paragraph: 'YAY! You can click the left click!', emoji: '👆' },
    { Heading: 'Left mouse button up', Paragraph: 'You have mastered the art of raising your finger from the left mouse button', emoji: '👈' },
    { Heading: 'Oh the DRAG', Paragraph: 'You actually managed to drag an item', emoji: '↖' },
    { Heading: 'Oh the DRAG 2', Paragraph: 'You actually managed to drag an item into the fridge', emoji: '↙' },
    { Heading: 'Enerprenur', Paragraph: 'You managed to click the start button', emoji: '🦄' },
    { Heading: 'Y so serious?', Paragraph: 'You were smiling!', emoji: '😆' },
    { Heading: 'MAKE SOME NOIZ', Paragraph: 'You started stage 2 of the game.', emoji: '🔊' },
    { Heading: 'Time to remember', Paragraph: 'You started stage 3 of the game.', emoji: '⏲' },
    { Heading: 'What\'s in the pot?', Paragraph: 'You picked the pot!', emoji: '🍲' },
    { Heading: 'And so it begins', Paragraph: 'You started fixing up the mess', emoji: '🔰' },
    { Heading: 'Fixer', Paragraph: 'You fixed the game!', emoji: '🛠' },
    { Heading: 'Repairer', Paragraph: 'You ordered 100% of the fridge', emoji: '🔧' },
    { Heading: 'Paragon', Paragraph: 'You ordered 80% of the fridge', emoji: '👼' },
    { Heading: 'True neutral', Paragraph: 'You ordered 50% of the fridge', emoji: '😐' },
    { Heading: 'PULL!', Paragraph: 'You ordered 30% of the fridge', emoji: '🙄' },
    { Heading: 'Almost nothing done', Paragraph: 'You ordered 20% of the fridge', emoji: '⛔' },
    { Heading: 'Ghost', Paragraph: 'You ordered 0% of the fridge', emoji: '👻' },
    { Heading: 'POTATO', Paragraph: 'High in carps', emoji: '🍠' },
    { Heading: 'OH CRAP', Paragraph: 'Shit just hit the fan!', emoji: '💩' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
    { Heading: '', Paragraph: '', emoji: '' },
];


function setNextAchievement() {

    createAchievementDiv(achievement[i]);
    i++;
}

function createAchievementDiv(achievement) {
    greet = greets[Math.floor(Math.random() * greets.length)];
    animation = animations[Math.floor(Math.random() * animations.length)];

    newAchievementElement = `<div class="modal-window ${animation} animated">` +
        `` +
        `<h1>${achievement.Heading} Achievement!</h1>` +
        `<p>${greet} ${achievement.Paragraph}</p>` +
        `<div style="font-size: 10em;">${achievement.emoji}</div>` +
        `</div>`;

    acheivementPlaceholder.innerHTML = newAchievementElement;
}

window.addEventListener('load', function () {


    acheivementPlaceholder = document.getElementById("acheivementPlaceholder");

})
