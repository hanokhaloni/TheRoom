


function allowDrop(ev) {

    ev.preventDefault();
}

function drag(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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

}


