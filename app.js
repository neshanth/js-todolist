const form = document.querySelector("#form");
const todoInput = document.querySelector('#todoInput');
const todoList =  document.querySelector('.todo-list');
const submitBtn = document.querySelector('#submit');


let editFlag = false;
let editTodoId;
let editElement;


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
    addtoLocalStorage(id,todo);
    
  }
  else if(todo!="" && editFlag)
  {
 
   editElement = document.querySelector('.todo-item').firstChild;
   editElement.textContent = todo;
   editLocalStorage(editTodoId,todo);
   
  }
  todoInput.value = "";
  
}


function getLocalStorage(){
  return localStorage.getItem("list")
  ?JSON.parse(localStorage.getItem("list")) : [];
}

function addtoLocalStorage(id,value)
{
  const todo = {id,value};
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
 
}

function editTodo(e){
  const todo = e.target.parentElement.parentElement;
  todoInput.value = todo.firstChild.textContent;
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
    div.innerHTML  = `<p class="todo">${todo}</p>
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

