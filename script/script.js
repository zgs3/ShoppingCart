document.querySelector("#date").innerHTML= new Date().toDateString();

const mainInput = document.querySelector('.mainInput');
const submitBtn = document.querySelector('.submitBtn');
const itemsUl = document.querySelector('.itemsUl');

submitBtn.addEventListener('click', itemAdder);

function itemAdder(event){
  event.preventDefault();
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  itemDiv.classList.add('flex');
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
  // adding delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteBtn.classList.add('deleteBtn');
  itemDiv.append(deleteBtn);
  // appending whole new div to ul
  itemsUl.append(itemDiv);
}