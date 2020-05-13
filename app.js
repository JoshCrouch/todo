let items = [];

if (window.localStorage.getItem("items") != null) { //This is here instead of startup() for bug reasons
    items = JSON.parse(window.localStorage.getItem("items"));
}

startup(items);
console.log(items);

function add() {

    let text = prompt("What is the task called?");

    if (text == null) {
        return;
    }

    items.push(text);

    localStorageUpdate();

    write(text, items.length - 1);
}

function write(text, ID) {
    var ul = document.getElementById("list");

    var li      =   document.createElement("li");
    var p       =   document.createElement("p");
    var span    =   document.createElement("span");
    var img     =   document.createElement("img");

    var pText  =   document.createTextNode(text);

    li.appendChild(p);
    li.appendChild(span);
    p.appendChild(pText);
    span.appendChild(img);

    li.setAttribute("class", "item");
    li.setAttribute("id", ID);

    p.setAttribute("class", "text");
    span.setAttribute("class", "closeWrapper");
    img.setAttribute("class", "close");

    img.src = "Times.svg";

    img.onclick = function() {remove(this)};

    ul.appendChild(li);


}

function startup(items) {

    console.log(items);

    for (var i = 0; i < items.length; i++ ) {
        write(items[i], i);
    }

    console.log(items);
}

function empty() {
    window.localStorage.clear();

    items.length = 0;
    document.querySelectorAll(".item").forEach(e => e.remove());
}

function remove(object) {

    var parent = object.parentNode.parentNode;

    parent.style.background = "#C0C0C0";
    parent.style.border = "0.25vw solid #C0C0C0";

    parent.style.transition = "opacity ease-in 1s";
    parent.style.opacity = 0;

    

    setTimeout(() => { 

        items.splice(parent.id, 1);
        localStorageUpdate();

        parent.remove();

        console.log("Removed");

    }, 1000);

}

function localStorageUpdate() {
    window.localStorage.removeItem("items");
    window.localStorage.setItem("items", JSON.stringify(items));
}
