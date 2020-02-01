

let open = true;
let dropped = 0;
let fridgePlaceholders = [];


let readyForRearange = false;
const inventoryItems = [
    { id: 1, name: 'cupcake', src: './assets/cupcake.png' },
    { id: 2, name: 'pitcher', src: './assets/pitcher.png' },
    /* { id: 3, name: 'eggs', src: './assets/eggs_01.png' },
    { id: 4, name: 'buttermilk', src: './assets/buttermilk.png' },
    { id: 5, name: 'mystery', src: './assets/mystery.png' }, */
]

const inventoryDivItems = [];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.preventDefault();
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.target.style.opacity = 0.5;
}

function drop(ev) {
    console.log('DROP ', ev);

    ev.preventDefault();
    const invId = ev.dataTransfer.getData("Text");
    const itemElement = document.getElementById(invId);
    const spot = ev.target;
    // debugger;
    itemElement.style.opacity = 1;
    // spot.appendChild(itemElement);
    dropped++;

 
    document.querySelector('.instructions').style.opacity = dropped > 0 ? 0 : 1;
    document.querySelector('.ready-btn').style.opacity = dropped >= inventoryItems.length ? 1 : 0;

    const invItem = inventoryItems.find(a => a.id.toString() === invId.toString())
    const placeHolder = fridgePlaceholders.find(placeHolder => placeHolder.id.toString() === ev.target.id.toString());

    placeHolder.inventory = invItem;
    
    placeHolder.element.appendChild(itemElement);

    if (!readyForRearange) {
        
        localStorage.setItem('spotsBeforeMess', JSON.stringify([...fridgePlaceholders]));
    } else {
        dropped = 0;
        localStorage.setItem('spotsAfterMess', JSON.stringify([...fridgePlaceholders]));
    }
}

function getOpacity() {
    return 0;
}

enterance = false
function readyClicked() {

    open = !open;
    // const str = open ? 'open' : 'close'
    const dropZonesContainer = document.querySelector('.drop-zones-container');
    const fridge = document.querySelector('.refregirator');
    const fridgeImg = document.querySelector('#fridge');


    /* if (!enterance && fridge.classList.contains('bounceInRight')) {
        enterance = true;
        fridge.classList.remove('animated', 'bounceInRight');
    } */

    dropZonesContainer.style.opacity = open ? 1 : 0;

    if (!open) {
        fridgeImg.style['margin-left'] = '0';
        fridgeImg.classList.add('animated', 'infinite', 'shake', 'delay-500ms');
        document.querySelector('.ready-btn').innerHTML = "STOP";
        readyForRearange = true;
    } else {
        fridgeImg.style['margin-left'] = '200px';
        fridgeImg.classList.remove('animated', 'infinite', 'shake', 'delay-500ms');

        if (readyForRearange) {
            const messZone = document.querySelector('.mess-zone');
            fridgePlaceholders.forEach(a => a.inventory = null);
            document.querySelector('.ready-btn').style.opacity = 0;

            inventoryDivItems.forEach(item => {
                item.style.position = 'absolute';
                const deg = Math.floor(Math.random() * 360);
                const xx = Math.floor(Math.random() * 120);
                item.style.transform = `translateX(${xx}px) rotate(${deg}deg)`;
                messZone.appendChild(item);
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
        // element.innerHTML = i;
        dropzone.appendChild(element);
        fridgePlaceholders.push({ id: i, element });
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

            console.log('DRAG START!!!!',item.id);
            
            ev.dataTransfer.setData("Text", item.id);
            ev.target.style.opacity = 0.5;
        }

        inventoryElement.appendChild(invItem);

    })

}


