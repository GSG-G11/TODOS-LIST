// declaring variables
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todosContainer = document.getElementById("todos-container");

// add event lisener to the (add) button
addTodoBtn.addEventListener("click", addTodo);

// explanation "when the user click on add its take the input value and assign it to array in localstorage withe the same key and every time you clicked add btn and write any value in the input it push it to the same array "
function addTodo() {
  let inputValue = todoInput.value;
  if (inputValue.trim() != 0) {
    let todoTask = localStorage.getItem("todos");
    if (todoTask == null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todoTask);
    }
    todoArray.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }
  showTodos();
  todoInput.value = "";
}

showTodos();

// show todos function
// it's bring the todos form the localstoragae and reveres the array to show the recent added todos to the top and foreach item it create a div contains the todo and it's btns
function showTodos() {
  let todoTask = localStorage.getItem("todos");
  todoTask == null ? (todoArray = []) : (todoArray = JSON.parse(todoTask));
  let finalTodo = "";

  todoArray.reverse().forEach((task) => {
    finalTodo += `
              <p>${task}</p>
      <div class="icons">
        <span class="iconify-inline" data-icon="ic:twotone-done" id="done-icon"></span>
        <span class="iconify-inline" data-icon="ci:edit" id="edit-icon"></span>
        <span class="iconify-inline" data-icon="ic:round-delete-outline" id="del-icon"></span>
      </div>
      `;
  });
  todosContainer.innerHTML = finalTodo;
}
