// make variables
var submit = document.querySelector(".form button");
var inputTask = document.querySelector(".form input");
var list = document.querySelector(".toDo .list");
var closeIcons = document.querySelectorAll(".toDo i");
var completedTasksHolder = document.querySelector(".done .list");

showAllSavedItem();
// add event
list.addEventListener("click", icons)
completedTasksHolder.addEventListener("click", icons)
document.forms[0].addEventListener("submit", addItem);
addEventListener("click" , saveEditedItem);

// add item
function addItem(event) {
    event.preventDefault();
    var text = inputTask.value.trim();
    
    if (text === "") {
        alert('Please enter a task!');
    }
    // create new items in list
    else if (text != "") {
        addToStorage(text);
        showAllSavedItem();
       
    }
    bindTaskEvents(text, taskCompleted);
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
    }

}

// add old items to local storage
function addToStorage(text) {
    var currentNames = oldItems();
    var date = new Date();
    var newItem = {
        id: date.getTime(),
        content: text,
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

// function for showing all saved old items in storage
function showAllSavedItem() {
    var old = oldItems();
    list.innerHTML = "";
    for (var i = 0; i < old.length; i++) {

        list.innerHTML += `<li data-id="${old[i].id}">
                             <div>
                               <input type="checkbox" name="item" id="item${i}" /><label for="item${i}"
                                >${old[i].content}</label
                                >
                             </div>
                             <div class="icons">
                             <i class='bx bx-edit'></i>
                              <i class="bx bx-x"></i>
                              </div>
    
                            </li>`;
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

function saveEditedItem(){
    var editing = list.querySelector("input[type='text']");
    var old = oldItems();

    for (var i = 0; i < old.length; i++) {
        if (old[i].id == editing.parentElement.dataset.id) {
            old[i].content = editing.value;
        }

    }
    localStorage.setItem("names", JSON.stringify(old))
    closeEditingInput(editing);
}

function closeEditingInput(element){
    var newLabel = document.createElement("label");
    var newText = document.createTextNode( element.parentElement.parentElement.children[0].children[1].value);
    newLabel.htmlFor = element.parentElement.parentElement.children[0].children[0].id;
    newLabel.appendChild(newText);

    element.parentElement.parentElement.children[0].insertBefore(newLabel ,element.parentElement.parentElement.children[0].lastchild)
    element.remove();
}

//Mark a task as complete
function taskCompleted () {
    console.log("Task Complete...");
   //When the Checkbox is checked 
   //Append the task list item to the #done ul
    var listItem = this.parentNode.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
 }
 
 
//  //Mark a task as incomplete
 function taskIncomplete() {
      console.log("Task Incomplete...");
      //When the checkbox is unchecked appendTo toDo
   var listItem = this.parentNode.parentNode;
   list.appendChild(listItem);
   bindTaskEvents(listItem, taskCompleted);
 }
 
 
//  //Set the click handler to the addTask function
 submit.addEventListener("click", addItem); 
 
 
 function bindTaskEvents(taskListItem, checkBoxEventHandler) {
       console.log("Bind List item events");
       // select listitems chidlren
       var checkBox = taskListItem.querySelector('input[type="checkbox"]');
     var editIcon = taskListItem.querySelector("i.bx-edit");
     var deleteIcon = taskListItem.querySelector("i.bx-x");
         //bind editTask to edit Icon
       editIcon.onclick = editItem;
         //bind deleteTask to delete Icon
          deleteIcon.onclick = deleteItem;
         //bind checkBoxEventHandler to checkbox
       checkBox.onchange = checkBoxEventHandler;
  
 }
 
 //cycle over incompleteTaskHolder ul list items
 for (var i = 0; i < list.children.length; i ++) {
   //bind events to list item's children (taskCompleted)	
   bindTaskEvents(list.children[i], taskCompleted);
 }
 
 //cycle over completedTaskHolder ul list items
 for (var i = 0; i < completedTasksHolder.children.length; i ++) {
   //bind events to list item's children (taskCompleted)	
   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
 }