// showing current date
document.querySelector("#date").innerHTML= new Date().toDateString();

const mainInput = document.querySelector('.mainInput');
const submitBtn = document.querySelector('.submitBtn');
const itemsUl = document.querySelector('.itemsUl');

// loading items from local storage after DOM is loaded
document.addEventListener('DOMContentLoaded', getItems)

// click events for input and item edit buttons 
submitBtn.addEventListener('click', itemAdder);
itemsUl.addEventListener('click', checkOrDelete)


// function for adding items to the list
function itemAdder(event){
  event.preventDefault();
  // creating item div
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  itemDiv.classList.add('flex');
  // creating new li item
  const newItemLi = document.createElement('li');
  newItemLi.innerText = mainInput.value;
  newItemLi.classList.add('itemLi')
  itemDiv.append(newItemLi);
  // adding item to localStorage
  saveLocalStorage(mainInput.value);
  // adding check button
  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = '<i class="fas fa-circle-check"></i>';
  checkBtn.classList.add('checkBtn');
  itemDiv.append(checkBtn);
  // adding edit button
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="fas fa-pencil"></i>';
  editBtn.classList.add('editBtn');
  itemDiv.append(editBtn);
  // adding delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteBtn.classList.add('deleteBtn');
  itemDiv.append(deleteBtn);
  // appending whole new div to ul and clearing input field
  itemsUl.append(itemDiv);
  mainInput.value = '';
}


// function for check, edit and delete buttons
function checkOrDelete(event) {
  const item = event.target;
  const itemParent = item.parentElement;
  // delete button functionality
  if (item.classList[1] == 'fa-trash-can') {
    let target = itemParent.parentElement;
    removeLocalItems(item);
    target.remove();
  }

  // check button functionality
  if (item.classList[1] == 'fa-circle-check') {
    // marking item as "checked"
    let target = itemParent.parentElement;
    target.classList.add('checked');
    // removing edit and check buttons for "checked" item
    let editBtn = itemParent.nextElementSibling;
    if (editBtn.classList == 'editBtn') {
      editBtn.remove();
    }
    itemParent.remove();
  }

  // edit button functionality
  if (item.classList[1] == 'fa-pencil') {
    let checkBtn = itemParent.previousElementSibling;
    let delBtn = itemParent.nextElementSibling;
    let oldLi = checkBtn.previousElementSibling;
    // creating, appending new input
    const newInput = document.createElement('input');
    newInput.value = oldLi.innerHTML;
    newInput.classList.add('editInput');
    let itemDiv = checkBtn.parentElement;
    itemDiv.prepend(newInput);
    oldLi.classList.add('hidden');
    // removing existing value and old buttons
    checkBtn.remove();
    itemParent.remove();
    delBtn.remove();
    // creating new confirm button
    const newCheckBtn = document.createElement('button');
    newCheckBtn.innerHTML = '<i class="fas fa-check"></i>';
    newCheckBtn.classList.add('checkBtn');
    newCheckBtn.classList.add('newBtn');
    itemDiv.append(newCheckBtn);
  }

  // adding new functionality for new confirm button
  if (item.classList[1] == 'fa-check') {
    let itemParent = item.parentElement;
    let itemDiv = itemParent.parentElement;
    // hidden value
    let hiddenValue = itemDiv.children[1].innerText;
    let newInput = itemParent.previousElementSibling.previousElementSibling;
    // creating new li item
    let newLi = document.createElement('li')
    newLi.innerText = newInput.value;
    newLi.classList.add('itemLi')
    let parentDiv = newInput.parentElement;
    parentDiv.prepend(newLi);
    editLocalItems(item);
    // removing new input and new confirm button
    newInput.remove();
    item.remove();
    // adding new check button
    let checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-circle-check"></i>';
    checkBtn.classList.add('checkBtn');
    parentDiv.append(checkBtn);
    // new delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteBtn.classList.add('deleteBtn');
    parentDiv.append(deleteBtn);
  }
}


// function for saving items to local storage
function saveLocalStorage(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}


// function for geting items from local storage
function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.forEach(function(item) {
  // creating item div
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  itemDiv.classList.add('flex');
  // creating new li item
  const newItemLi = document.createElement('li');
  newItemLi.innerText = item;
  newItemLi.classList.add('itemLi')
  itemDiv.append(newItemLi);
  // adding check button
  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = '<i class="fas fa-circle-check"></i>';
  checkBtn.classList.add('checkBtn');
  itemDiv.append(checkBtn);
  // adding edit button
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="fas fa-pencil"></i>';
  editBtn.classList.add('editBtn');
  itemDiv.append(editBtn);
  // adding delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteBtn.classList.add('deleteBtn');
  itemDiv.append(deleteBtn);
  // appending whole new div to ul
  itemsUl.append(itemDiv);
  })
}


// function for removing items from local storage
function removeLocalItems(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  // getting index of selected item and removing it from local storage
  let itemIndex = item.parentElement.parentElement.children[0].innerText;
  items.splice(items.indexOf(itemIndex), 1);
  localStorage.setItem('items', JSON.stringify(items));
}


// function for editing item in local storage
function editLocalItems(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  // getting old and new item values
  let oldValue = item.parentElement.parentElement.children[2].innerText;
  let newInputValue = item.parentElement.parentElement.children[0].innerText;
  // replacing old value in local storage with new value
  let oldValueIndex = items.indexOf(oldValue);
  items[oldValueIndex] = newInputValue;
  localStorage.setItem('items', JSON.stringify(items));
  // removing hidden old item
  item.parentElement.parentElement.children[2].remove();
}
