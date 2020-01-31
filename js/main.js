

let open = true;

const inventoryItems = [
    { id: '1', name: 'milk', src: './assets/milk.png' },
    { id: '2', name: 'pitcher', src: './assets/pitcher.png' },
    { id: '3', name: 'eggs', src: './assets/eggs_01.png' },
    { id: '4', name: 'milk', src: './assets/milk.png' },
    { id: '5', name: 'milk', src: './assets/milk.png' },
]

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.opacity = 0.5;
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const element = document.getElementById(data);
    element.style.opacity = 1;
    ev.target.appendChild(element);
}

function readyClicked() {

    open = !open;
    // const str = open ? 'open' : 'close'
    const fridge = document.querySelector('.refregirator');
    const fridgeContent = document.querySelector('.drop-zone');

    if (fridge.classList.contains('bounceInRight')) {
        fridge.classList.remove('animated','bounceInRight');
        console.log('VBBDFBDFGD');
        
    }

    fridgeContent.style.opacity = open ? 1 :0;

    if (!open) {
        fridge.classList.add('animated', 'infinite', 'shake', 'delay-500ms');
    } else {
        fridge.classList.remove('animated', 'infinite', 'shake', 'delay-500ms');
    }

    document.getElementById("fridge").src = open?'./assets/openedFridge_02.png':'./assets/closedFridge_02.png';
}


function init() {
    /* const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');

    console.log(ctx); */


    // const dropzone = document.getElementById('dropzone');
    const item = document.getElementById('dpz-item');
    const totalSlots = 15;
    for (let i = 0; i < totalSlots; i++) {
        let element = item.cloneNode(true);
        item.parentNode.appendChild(element);
    }

    item.parentNode.removeChild(item);

    const inventoryElement = document.querySelector('.assets');
    inventoryItems.forEach(item => {
        const invItem = document.createElement("div");
        const img = document.createElement("img");

        img.src = item.src;
        img.height = 60;
        img.style.pointerEvents ='none';
        invItem.appendChild(img);
        invItem.className = "inventory-item";
        invItem.draggable = true;
        invItem.id = item.id;
        invItem.ondragexit = (ev) =>{
            ev.target.style.opacity = 1;
        }
        invItem.ondragstart = (ev) => {
            ev.dataTransfer.setData("text", ev.target.id);
            ev.target.style.opacity = 0.5;
        }
        inventoryElement.appendChild(invItem);

    })

}


