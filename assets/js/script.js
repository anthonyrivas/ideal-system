var todosContainer = document.querySelector('#todos');
var input = document.querySelector('#newTodo');
var todos = [];

function addNewItem(event) {
  event.preventDefault();
  var newItem = input.value;
  todos.push(newItem);
  storeListInLocalStorage();
  input.value = '';
  renderListToScreen();
}

function deleteItem(event) {
  event.preventDefault();
  if(event.target.matches('.delete')) {
    var index = event.target.parentElement.dataset.index;
    // delete an item from the array at index
    todos.splice(index, 1);
    storeListInLocalStorage();
    renderListToScreen();
  }
}

function renderListToScreen() {
  todosContainer.innerHTML = '';

  // loop over list adding each item to the page
  for (var i = 0; i < todos.length; i++) {
    var liEl = document.createElement('li');
    liEl.dataset.index = i;
    var pEl = document.createElement('p');
    pEl.textContent = todos[i];
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('class', 'delete');
    buttonEl.textContent = 'X';
    liEl.append(pEl, buttonEl);
    todosContainer.append(liEl);
  }
}

function storeListInLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todos));
}

function getListInLocalStorage() {
  var ls = JSON.parse(localStorage.getItem('todoList')) || [];
  todos = ls;
  renderListToScreen();
}

document.querySelector('#add').addEventListener('submit', addNewItem);

todosContainer.addEventListener('click', deleteItem);

getListInLocalStorage();