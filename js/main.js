// declaring variables
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todosContainer = document.getElementById("todos-container");
const editTodoBtn = document.getElementById("edit-todo-btn");
let savedIndexNumber = document.getElementById("saved-index-number");
let finshedTaskScore = 0;
let taskScore = 0;
let finshedTaskScoreSpan = document.getElementById("finshed-task-score");
let taskScoreSpan = document.getElementById("task-score");

function updateScore() {
  // save the scores to localstorage
  localStorage.setItem("taskScore", JSON.stringify(taskScore));
  localStorage.setItem("finishedTaskScore", JSON.stringify(finshedTaskScore));
  const finalTaskScore = JSON.parse(localStorage.getItem("taskScore"));

  const finalFinishedTaskScore = JSON.parse(
    localStorage.getItem("finishedTaskScore")
  );

  finshedTaskScoreSpan.textContent = finalFinishedTaskScore || 0;

  taskScoreSpan.textContent = finalTaskScore || 0;

  if (finshedTaskScore < 0) {
    finshedTaskScoreSpan.textContent = 0;
  }
  if (taskScore < 0) {
    taskScoreSpan.textContent = 0;
  }
}
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
    todoArray.unshift(inputValue);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }
  taskScore++;
  showTodos();
  updateScore();

  todoInput.value = "";
}

showTodos();

// show todos function
// it's bring the todos form the localstoragae and foreach item it create a div contains the todo and it's btns
function showTodos() {
  let todoTask = localStorage.getItem("todos");
  todoTask == null ? (todoArray = []) : (todoArray = JSON.parse(todoTask));
  let finalTodo = "";

  todoArray.forEach((task, index) => {
    finalTodo += `
      <div>
              <p>${task}</p>
      <div class="icons">
        <span class="iconify-inline" data-icon="ic:twotone-done" id="done-icon" onclick=' finsishTodo(${index})'></span>
        <span class="iconify-inline" data-icon="ci:edit" id="edit-icon" onclick='editTodo(${index})'></span>
        <span class="iconify-inline" data-icon="ic:round-delete-outline" id="del-icon"  onclick="deleteTodo(${index})"></span>
      </div>
      </div>

      `;
  });
  todosContainer.innerHTML = finalTodo;
}

// How the edit button works: when a user clicks on the edit button, the value and show on the input felid and then the save button will show next to the add button and the add button will get disabled

function editTodo(i) {
  let todoTask = localStorage.getItem("todos");
  savedIndexNumber.value = i;
  let todoArray = JSON.parse(todoTask);
  todoInput.value = todoArray[i];
  editTodoBtn.style.display = "block";
  addTodoBtn.style.display = "none";
}

editTodoBtn.addEventListener("click", saveChanges);

function saveChanges() {
  let todoTask = localStorage.getItem("todos");
  let todoArray = JSON.parse(todoTask);
  let savedIndex = savedIndexNumber.value;
  todoArray[savedIndex] = todoInput.value;
  localStorage.setItem("todos", JSON.stringify(todoArray));
  showTodos();

  editTodoBtn.style.display = "none";
  location.reload();
}

// How the delete button works: when a user clicks on the delete button,
// the delete button will delete the todo from the localstorage and the showTodos function will show the todos again
//  And delete the todo task from the result container

function deleteTodo(i) {
  let todoTask = localStorage.getItem("todos");
  let todoArray = JSON.parse(todoTask);
  todoArray.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todoArray));
  taskScore--;
  finshedTaskScore++;
  updateScore();

  showTodos();
}

// How the finish button works: when a user clicks on the finish button,
// the text will change to strikethrough and the text color will change to red
// and the todo will be deleted after 3 seconds

function finsishTodo(i) {
  let taskPlace = todosContainer.children[i].children[0];
  taskPlace.style.textDecoration = "line-through";
  taskPlace.style.color = "red";
  setTimeout(() => {
    deleteTodo();
    taskScore--;
    updateScore();
  }, 3000);
}
