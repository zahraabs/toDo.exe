// make variables
var submit = document.querySelector(".form button");
var inputTask = document.querySelector(".form input");
var list = document.querySelector(".toDo .list");
var closeIcons = document.querySelectorAll(".toDo i");
var completedTask = document.querySelector(".done .list");

showUnComplete();
showCompleteList();
// events
list.addEventListener("click", icons);
completedTask.addEventListener("click" , icons);


document.forms[0].addEventListener("submit", addItem);
addEventListener("click", saveEditedItem);

// add item
function addItem(event) {
    event.preventDefault();
    var text = inputTask.value;
    if (text === "") {
        alert('Please enter a task!');
    }
    else if (text != "") {
        addToStorage(text);
        showUnComplete();
    }
    inputTask.value = '';
    inputTask.focus();
}

//function for list of icons
function icons(e) {
    e.stopPropagation();
    if (e.target.nodeName === "I" && e.target.classList.contains("bx-x")) {
        deleteItem(e.target.parentElement.parentElement.dataset.id);
        e.target.parentElement.parentElement.remove();
    } else if (e.target.classList.contains("bx-edit")) {
        editItem(e.target);
    } else if (e.target.nodeName === "INPUT") {
        complete(e.target);
    }
}

// add old items to local storage
function addToStorage(text) {
    var currentNames = oldItems();
    var date = new Date();
    var newItem = {
        id: date.getTime(),
        content: text,
        isDone: false
    }

    currentNames.push(newItem);
    localStorage.setItem("names", JSON.stringify(currentNames))
}

// get old names and return an array
function oldItems() {
    var oldNames;
    oldNames = JSON.parse(localStorage.getItem("names"));

    if (oldNames == null) {
        return [];
    }
    return oldNames;
}

// function for showing all uncomplete items in storage
function showUnComplete() {
    var old = oldItems();
    list.innerHTML = "";
    for (var i = 0; i < old.length; i++) {
        if (old[i].isDone == false) {
            list.innerHTML += `<li data-id="${old[i].id}">
                                    <div>
                                    <input type="checkbox" name="item" id="item${i}" />
                                    <label for="item${i}"
                                    >${old[i].content}
                                    </label>
                                    </div>
                                    <div class="icons">
                                    <i class='bx bx-edit'></i>
                                    <i class="bx bx-x"></i>
                                    </div>
                              </li>`;
        }

    }
}

function deleteItem(id) {
    var old = oldItems();

    for (var i = 0; i < old.length; i++) {
        if (old[i].id == id) {
            old.splice(i, 1);
        }

    }
    localStorage.setItem("names", JSON.stringify(old))
}

function editItem(element) {
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.value = element.parentElement.parentElement.children[0].children[1].innerText;
    element.parentElement.parentElement.children[0].children[1].remove();
    element.parentElement.parentElement.children[0].insertBefore(newInput, element.parentElement.parentElement.children[0].lastchild)
    newInput.focus();
}

function complete(element) {
    var old = oldItems();
    for (var i = 0; i < old.length; i++) {
        if (old[i].id == element.parentElement.parentElement.dataset.id) {
            old[i].isDone = !old[i].isDone;
        }
    }
    localStorage.setItem("names", JSON.stringify(old));

    showCompleteList();
    showUnComplete();
}

function saveEditedItem() {
    var editing = list.querySelector("input[type='text']");
    var old = oldItems();
    if (editing == null) {
        return [];
    } else {
        for (var i = 0; i < old.length; i++) {
            if (old[i].id == editing.parentElement.parentElement.dataset.id) {
                old[i].content = editing.value;
            }
        }
        localStorage.setItem("names", JSON.stringify(old));
        closeEditingInput(editing);
    }
}

function closeEditingInput(element) {
    var newLabel = document.createElement("label");
    var newText = document.createTextNode(element.parentElement.parentElement.children[0].children[1].value);
    newLabel.htmlFor = element.parentElement.parentElement.children[0].children[0].id;
    newLabel.appendChild(newText);

    element.parentElement.parentElement.children[0].insertBefore(newLabel, element.parentElement.parentElement.children[0].lastchild)
    element.remove();
}

function showCompleteList() {
    var old = oldItems();
    completedTask.innerHTML = "";
    for (var i = 0; i < old.length; i++) {
        if (old[i].isDone == true) {

            completedTask.innerHTML += `<li data-id="${old[i].id}">
                                            <div>
                                            <input type="checkbox" name="item" id="item${i}" checked/>
                                            <label for="item${i}"
                                                >${old[i].content}
                                                </label>
                                            </div>
                                            <div class="icons">
                                            <i class="bx bx-x"></i>
                                            </div>
        
                                      </li>`;

        }
    }

}



