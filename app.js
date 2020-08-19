const todoInput = document.querySelector('#todoInput');
const todoList =  document.querySelector('.todo-list');
const submitBtn = document.querySelector('#submit');
const completedCount = document.querySelector('#completed');
 



let editFlag = false;
let editTodoId;
let editElement;
let completed = false;


//Add todo Item to todoList

submitBtn.addEventListener('click',addTodo);
window.addEventListener('keydown',function(e){
     if(e.keyCode === 13)
     {
       addTodo();
     }
})
window.addEventListener('DOMContentLoaded',displayTodos);

function addTodo()
{
  const id = new Date().getTime().toString();
  const todo = todoInput.value;

  if(todo !== "" &&  !editFlag)
  {
    renderTodos(id,todo);
    getLocalStorage();
    addtoLocalStorage(id,todo,completed);
    
  }
  else if(todo!="" && editFlag)
  {
 
   editElement = document.querySelector('.todo-item').firstChild;
   editElement.textContent = todo;
   editLocalStorage(editTodoId,todo);
   
  }
  todoInput.value = "";
  location.reload();
  
}


function getLocalStorage(){
  return localStorage.getItem("list")
  ?JSON.parse(localStorage.getItem("list")) : [];
}

function addtoLocalStorage(id,value,completed)
{
  const todo = {id,value,completed};
  let items = getLocalStorage();
  items.push(todo);
  localStorage.setItem("list",JSON.stringify(items));
  
  
}

// Display from Local Storage
function displayTodos(){
  
  let items = getLocalStorage();

  items.forEach((item) => {
     renderTodos(item.id,item.value);
  })
   
  let completedItems = items.filter(item => item.completed === true);
  

  const totalNoOfItems = document.querySelector('#noOfItems');
  totalNoOfItems.textContent = `No of items :  ${items.length}`;
  
}

function editTodo(e){
  const todo = e.target.parentElement.parentElement;
  todoInput.value = todo.children[1].textContent;
  editFlag = true;
  editTodoId = todo.dataset.id;

 }

//Function to render todos
function renderTodos(id,todo){
  
    const div = document.createElement('div');
    div.classList.add('todo-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    div.setAttributeNode(attr);
    div.innerHTML  = `
   
    <input type="checkbox" aria-label="Checkbox for following text input" class="checkbox">
    <p class="todo">${todo}</p>
    <div class="btn-container">
    <i class="fa fa-pencil" id="edit" aria-hidden="true"></i>
    <i class="fa fa-trash" id="delete" aria-hidden="true"></i>
    
    </div>
    `;

    //event listeners
    const editBtn = div.querySelector('#edit');
    editBtn.addEventListener('click',editTodo);
    const deleteBtn = div.querySelector('#delete');
    deleteBtn.addEventListener('click',deleteTodo);
    const checkbox = div.querySelector('.checkbox');
    checkbox.addEventListener('change',isCompleted);
    todoList.appendChild(div);
    
   
}

//Method to edit LocalStorage
function editLocalStorage(editTodoId,todo){
  
  let items = getLocalStorage();

   items.map((item) =>  {
          
           if(item.id === editTodoId)
           {
              item.value = todo;
           }
  });

  localStorage.setItem('list',JSON.stringify(items));

}


//delete Todo

function deleteTodo(e){
   const todo = e.target.parentElement.parentElement;
   const todoId = todo.dataset.id;
   console.log(todo);
   todo.parentNode.removeChild(todo);
   removeFromLocalStorage(todoId);
   location.reload();
   
}

function removeFromLocalStorage(id)
{
   let itemsFromLS = getLocalStorage();

   let items = itemsFromLS.filter((item) => {
        if(item.id !== id)
        {
          return item;
        }
   });

   localStorage.setItem('list',JSON.stringify(items));
}

// Displaying the day

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

let now = new Date();
let dayNumber = now.getDay();

const title = document.querySelector('#title');
title.textContent = `Enjoy Your  ${days[dayNumber]} 🍺`;

function isCompleted(checkbox)
{
  let checkBox = checkbox.target;
  let todoItem = checkBox.parentElement.children[1];
  checkBox.checked ? todoItem.classList.add('completed'):todoItem.classList.remove('completed');
  if(checkBox.checked === true)
  {
    completed = true
    completedLocalStorage(completed,todoItem)
     
  }
  else
  {
    completed = false;
    completedLocalStorage(completed,todoItem);

  }
}

function completedLocalStorage(completed,todoItem)
{
  let items = getLocalStorage();
  items.forEach((item => {
   if(todoItem.parentElement.dataset.id === item.id)
   {
       item.completed = completed;
   }
  }))

  localStorage.setItem('list',JSON.stringify(items));
}