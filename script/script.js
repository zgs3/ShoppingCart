document.querySelector("#date").innerHTML= new Date().toDateString();

const mainInput = document.querySelector('.mainInput');
const submitBtn = document.querySelector('.submitBtn');
const itemsUl = document.querySelector('.itemsUl');

submitBtn.addEventListener('click', itemAdder);
itemsUl.addEventListener('click', checkOrDelete)

function itemAdder(event){
  event.preventDefault();
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  itemDiv.classList.add('flex');
  // creating new li item
  const newItemLi = document.createElement('li');
  newItemLi.innerText = mainInput.value;
  mainInput.value = '';
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
}

function checkOrDelete(event) {
  const item = event.target;
  const itemParent = item.parentElement;
  if (item.classList[1] == 'fa-trash-can') {
    let target = itemParent.parentElement;
    target.remove();
  }
  if (item.classList[1] == 'fa-circle-check') {
    let target = itemParent.parentElement;
    target.classList.add('checked');
  }
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
    // removing existing value and old buttons
    oldLi.remove();
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
    let newInput = itemParent.previousElementSibling;
    // creating new li item
    let newLi = document.createElement('li')
    newLi.innerText = newInput.value;
    newLi.classList.add('itemLi')
    let parentDiv = newInput.parentElement;
    parentDiv.prepend(newLi);
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

