let open = true;
let dropped = 0;
let fridgePlaceholders = [];
let rearngeState;
let needToFill;
let readyForRearange = false;
let spotsBeforeMess = [];
let spotsAfterMess = [];
const inventoryDivItems = [];
const inventoryItems = [
    { id: 1, name: 'buttermilk', src: './assets/Elements/buttermilk.png' },
    { id: 2, name: 'cheese', src: './assets/Elements/cheese.png' },
    { id: 3, name: 'cupcake', src: './assets/Elements/cupcake.png' },
    { id: 4, name: 'eggs_01', src: './assets/Elements/eggs_01.png' },
    { id: 5, name: 'mouse', src: './assets/Elements/mouse.png' },
    { id: 6, name: 'mystery', src: './assets/Elements/mystery.png' },
    { id: 7, name: 'pitcher', src: './assets/Elements/pitcher.png' },
    { id: 8, name: 'salad', src: './assets/Elements/salad.png' },
    { id: 9, name: 'salami', src: './assets/Elements/salami.png' },
    { id: 10, name: 'sandwich', src: './assets/Elements/sandwich.png' },
]

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.preventDefault();
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.target.style.opacity = 0.5;
    createAchievementDiv(achievement.DRAG1)
}

function drop(ev) {
    createAchievementDiv(achievement.DRAG2);
    sounds.WOOSH.play();

    ev.preventDefault();
    const invId = ev.dataTransfer.getData("Text");
    const itemElement = document.getElementById(invId);
    const readyBtn = document.querySelector('.ready-btn')

    itemElement.style.opacity = 1;
    itemElement.placed = true;
    dropped++;

    needToFill = Math.min(inventoryItems.length, 9)
    document.querySelector('.instructions').style.opacity = dropped > 0 ? 0 : 1;
    readyBtn.style.opacity = (dropped === needToFill) && !rearngeState ? 1 : 0;

    const invItem = inventoryItems.find(a => a.id.toString() === invId.toString())
    const placeHolder = fridgePlaceholders.find(placeHolder => placeHolder.id.toString() === ev.target.id.toString());

    if (placeHolder && placeHolder.element) {
        placeHolder.inventory = invItem;
        placeHolder.element.appendChild(itemElement);

        if (!readyForRearange) {

            localStorage.setItem('spotsBeforeMess', JSON.stringify([...fridgePlaceholders]));
            spotsBeforeMess = JSON.parse(JSON.stringify(fridgePlaceholders));
        } else {

            if (!rearngeState) {
                rearngeState = true;
                dropped = 0;

            } else {
                if (dropped >= (needToFill - 1)) {
                    readyBtn.style.opacity = 1;
                    readyBtn.innerHTML = 'READY';
                    readyBtn.onclick = () => {
                        calculateScore();
                    }
                }
            }

            itemElement.style.transform = `translateX(${0}px) rotate(${0}deg)`;
            localStorage.setItem('spotsAfterMess', JSON.stringify([...fridgePlaceholders]));
            spotsAfterMess = JSON.parse(JSON.stringify(fridgePlaceholders));
        }
    }
}

function calculateScore() {
    document.querySelector('.ready-btn').style.opacity = 0;

    const before = spotsBeforeMess.map(a => a.inventory ? a.inventory.id : -1);
    const after = spotsAfterMess.map(a => a.inventory ? a.inventory.id : -1);

    let score = 0;
    before.filter(a => a !== -1).forEach((a, index) => {
        if (a === after[index]) {
            score++;
        }
    });

    if (score >= 9) {
        createAchievementDiv(achievement.END_100);
    } else if (score >= 8) {
        createAchievementDiv(achievement.END_80);
    } else if (score >= 5) {
        createAchievementDiv(achievement.END_50);
    } else if (score >= 3) {
        createAchievementDiv(achievement.END_30);
    } else if (score >= 1) {
        createAchievementDiv(achievement.END_20);
    } else {
        createAchievementDiv(achievement.END_0);
    }

    setTimeout(() => {
        createAchievementCertificate()
    }, 5000);
}

function readyClicked() {
    createAchievementDiv(achievement.READABILITY);
    createAchievementDiv(achievement.READY);

    open = !open;

    const dropZonesContainer = document.querySelector('.drop-zones-container');
    const fridgeImg = document.querySelector('#fridge');

    if (!open) {
        document.querySelector(".assets").style.visibility = "hidden";
        createAchievementDiv(achievement.STAGE2);
        sounds.Door3.play();
        sounds.DARKSHAKE.play();
        // fridgeImg.style['margin-left'] = '0';
        fridgeImg.classList.add('animated', 'infinite', 'shake', 'delay-500ms');
        const darkDiv = document.querySelector('.dark');
        darkDiv.style.visibility = 'visible';

        dropZonesContainer.style.opacity = 0;
        document.querySelector('.ready-btn').innerHTML = "STOP";
        readyForRearange = true;
        fridgeImg.src = './assets/fridge-close.png';
    } else {
        createAchievementDiv(achievement.STAGE3);
        sounds.Door1.play();
        sounds.DARKSHAKE.pause();
        // fridgeImg.style['margin-left'] = '200px';
        fridgeImg.classList.remove('animated', 'infinite', 'shake', 'delay-500ms');
        fridgeImg.classList.add('animated', 'bounce');
        const darkDiv = document.querySelector('.dark');
        darkDiv.style.visibility = 'hidden';

        fridgePlaceholders.forEach(a => a.inventory = null);
        document.querySelector('.ready-btn').style.opacity = 0;

        if (readyForRearange) {

            const messZone = document.querySelector('.mess-zone');
            inventoryDivItems.forEach(item => {
                if (item.placed) {
                    item.style.position = 'absolute';
                    const deg = Math.floor(Math.random() * 360);
                    const xx = Math.floor(Math.random() * 120);
                    item.style.transform = `translateX(${xx}px) rotate(${deg}deg)`;
                    messZone.appendChild(item);
                }
            })
        }
        setTimeout(() => {
            fridgeImg.src = './assets/fridge-open.png';
            dropZonesContainer.style.opacity = 1;

        }, 1000);
    }
}

function WhichButton(event) {
    if (event.button == 0) {
        createAchievementDiv(achievement.LEFTCLICK);
    } else if (event.button == 2) {
        createAchievementDiv(achievement.RIGHTCLICK);
    } else if (event.button == 1) {
        createAchievementDiv(achievement.MIDDLECLICK);
    }
}

function init() {
    setTimeoutAchievements();

    setTimeout(() => {
        createAchievementDiv(achievement.FIXER);
    }, 500);

    setTimeout(() => {
        createAchievementDiv(achievement.READABILITY);
    }, 2000);

    const dropzone = document.querySelector('#dropzone');
    const item = document.getElementById('dpz-item');
    const totalSlots = 9;

    for (let i = 0; i < totalSlots; i++) {
        let element = item.cloneNode(true);
        element.id = i;
        dropzone.appendChild(element);
        fridgePlaceholders.push({ id: i, element });
    }

    const btn = document.querySelector('.ready-btn')
    btn.style.opacity = 0;
    item.parentNode.removeChild(item);

    const inventoryElement = document.querySelector('.assets');
    inventoryItems.forEach(item => {
        const invItem = document.createElement("div");
        const img = document.createElement("img");

        inventoryDivItems.push(invItem);
        img.src = item.src;
        img.height = 90;
        img.style.pointerEvents = 'none';
        invItem.appendChild(img);
        invItem.className = "inventory-item";
        invItem.draggable = true;
        invItem.id = item.id;
        invItem.ondragexit = (ev) => {

            ev.target.style.opacity = 1;
        }
        invItem.ondragstart = (ev) => {
            ev.dataTransfer.setData("Text", item.id);
            ev.target.style.opacity = 0.5;
        }

        inventoryElement.appendChild(invItem);
    })
}


