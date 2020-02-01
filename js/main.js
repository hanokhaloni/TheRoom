

let open = true;
let dropped = 0;
const slots = [];

let readyForRearange = false;
const inventoryItems = [
    { id: 1, name: 'cupcake', src: './assets/cupcake.png' },
    { id: 2, name: 'pitcher', src: './assets/pitcher.png' },
    { id: 3, name: 'eggs', src: './assets/eggs_01.png' },
    { id: 4, name: 'buttermilk', src: './assets/buttermilk.png' },
    { id: 5, name: 'mystery', src: './assets/mystery.png' },
]

const inventoryDivItems = [];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.target.style.opacity = 0.5;
}

function drop(ev) {

    ev.preventDefault();
    const invId = ev.dataTransfer.getData("Text");
    const element = document.getElementById(invId);
    element.style.opacity = 1;
    ev.target.appendChild(element);

    dropped++;

    document.querySelector('.instructions').style.opacity = dropped > 0 ? 0 : 1;
    document.querySelector('.ready-btn').style.opacity = dropped >= 5 ? 1 : 0;


    const invItem = inventoryItems.find(a => a.id.toString() === invId.toString())
    const slot = slots.find(slot => slot.id.toString() === ev.target.id.toString());

    slot.inventory = invItem;

    localStorage.setItem('slots', JSON.stringify(slots));
}

function getOpacity() {
    return 0;
}

function readyClicked() {

    open = !open;
    // const str = open ? 'open' : 'close'
    const dropZonesContainer = document.querySelector('.drop-zones-container');
    const fridge = document.querySelector('.refregirator');
    const fridgeImg = document.querySelector('#fridge');

    if (fridge.classList.contains('bounceInRight')) {
        fridge.classList.remove('animated', 'bounceInRight');
    }

    dropZonesContainer.style.opacity = open ? 1 : 0;

    if (!open) {
        sounds.Door3.play();
        fridgeImg.style['margin-left'] = '0';
        fridgeImg.classList.add('animated', 'infinite', 'shake', 'delay-500ms');
        document.querySelector('.ready-btn').innerHTML = "STOP";
        readyForRearange = true;
    } else {
        sounds.Door1.play();
        fridgeImg.style['margin-left'] = '200px';
        fridgeImg.classList.remove('animated', 'infinite', 'shake', 'delay-500ms');

        if (readyForRearange) {
            document.querySelector('.ready-btn').style.opacity = 0;

            inventoryDivItems.forEach(item => {
                fridge.appendChild(item);

            })
        }
    }

    fridgeImg.src = open ? './assets/openedFridge_02.png' : './assets/closedFridge_02.png';
}

function init() {
    //TODO UNCOMMMENT!!!!!!!!!
    // setTimeoutAchievements();

    const dropzone = document.querySelector('#dropzone');
    const item = document.getElementById('dpz-item');
    const totalSlots = 15;

    for (let i = 0; i < totalSlots; i++) {
        let element = item.cloneNode(true);
        element.id = i;
        element.innerHTML = i;
        dropzone.appendChild(element);
        slots.push({ id: i, element });
    }

    const btn = document.querySelector('.ready-btn')
    btn.style.opacity = 0;
    /*  const dropzone2 = document.querySelector('#dropzone2');
     for (let i = 0; i < 9; i++) {
         let element = item.cloneNode(true);
         dropzone2.appendChild(element);
     } */

    item.parentNode.removeChild(item);

    const inventoryElement = document.querySelector('.assets');
    inventoryItems.forEach(item => {
        const invItem = document.createElement("div");
        const img = document.createElement("img");

        inventoryDivItems.push(invItem);
        img.src = item.src;
        img.height = 60;
        img.style.pointerEvents = 'none';
        invItem.appendChild(img);
        invItem.className = "inventory-item";
        invItem.draggable = true;
        invItem.id = item.id;
        // invItem.innerHTML = item.id;
        invItem.ondragexit = (ev) => {
            ev.target.style.opacity = 1;
        }
        invItem.ondragstart = (ev) => {
            ev.dataTransfer.setData("text", ev.target.id);
            ev.target.style.opacity = 0.5;
        }
        inventoryElement.appendChild(invItem);

    })

}


