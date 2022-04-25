document.querySelector("#date").innerHTML= new Date().toDateString();

const mainInput = document.querySelector('.mainInput');
const submitBtn = document.querySelector('.submitBtn');
const itemsUl = document.querySelector('.itemsUl');

submitBtn.addEventListener('click', itemAdder);

function itemAdder(event){
  event.preventDefault();
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  const newItemLi = document.createElement('li');
  newItemLi.innerText = 'test';
  newItemLi.classList.add('itemLi')
  itemDiv.append(newItemLi);
  itemsUl.append(itemDiv);
}