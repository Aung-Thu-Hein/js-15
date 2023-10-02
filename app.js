const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");

let editElement;
let editFlag = false;
let editID = "";

window.addEventListener("DOMContentLoaded", setupItems);
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value == "") {
        displayAlert("please add an item", "danger");
    }else if (value !== "" && !editFlag) {
        const element = document.createElement("article");

        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
    
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
         
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
          
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
    
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
    
        list.appendChild(element);
        container.style.visibility = "visible";
        
        addToLocalStorage(id, value);
        displayAlert("item added to the list", "success");
        setBackToDefault();
    } if(value !== "" && editFlag) {
        editElement.innerHTML = value;
        eidtLocalStorage(editID, value);
        displayAlert("edited item successfully", "success");
        setBackToDefault();
    }
}

function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function eidtLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map(function (item){
        if(item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}

function setupItems() {
    let items = getLocalStorage();

    if(items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        });
        container.style.visibility = "visible";
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
        
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
      
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    list.appendChild(element);
}

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

function clearItems() {
    
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }
    container.style.visibility = "hidden";  
    setBackToDefault();
    localStorage.removeItem("list");
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;

    submitBtn.innerHTML = "edit";
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);
    if(list.children.length === 0) {
        container.style.visibility = "hidden";
    }

    displayAlert("item removed", "danger");
    removeFromLocalStorage(id);
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function(item) {
        if(item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}
