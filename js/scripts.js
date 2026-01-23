const todoList = document.querySelector("#todo-list");
const taskFormSubmitBtn = document.querySelector("#task-form-submit-btn");
const taskFormInput = document.querySelector("#task-form-input");
const taskForm = document.querySelector("#task-form");
const editForm = document.querySelector("#edit-form");
const toolbar = document.querySelector("#toolbar");
const editFormInput = document.querySelector("#edit-form-input");
const editFormSubmitBtn = document.querySelector("#edit-form-submit-btn");
const editFormCancelBtn = document.querySelector("#edit-form-cancel-btn");

let lastTodoText;

function createTodo(text) {
  const textIsNullOrEmpty = !text.trim();

  if (textIsNullOrEmpty) return;

  const li = document.createElement("li");
  li.classList.add("todo");

  const h3 = document.createElement("h3");
  h3.innerText = text;
  li.appendChild(h3);

  const div = document.createElement("div");
  div.classList.add("todo-btns");
  li.appendChild(div);

  const doneButton = document.createElement("button");
  doneButton.classList.add("done-btn");
  div.appendChild(doneButton);
  doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  div.appendChild(editButton);
  editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  div.appendChild(removeButton);
  removeButton.innerHTML = '<i class="fa-solid fa-x"></i>';

  todoList.appendChild(li);

  taskFormInput.value = "";
  taskFormInput.focus();
}

function toggleScreens() {
  taskForm.classList.toggle("hide");
  editForm.classList.toggle("hide");
  toolbar.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

function updateTodo(text) {
  const allTodo = document.querySelectorAll(".todo");

  allTodo.forEach((todo) => {
    const todoText = todo.querySelector("h3");

    if (todoText.innerText === lastTodoText) {
      todoText.innerText = text;
      toggleScreens();
    }
  });
}

document.addEventListener("click", (e) => {
  const targetParent = e.target.parentElement;
  const father = targetParent.parentElement;

  if (e.target.classList.contains("done-btn")) {
    father.classList.toggle("done");
  }

  if (e.target.classList.contains("edit-btn")) {
    const todoText = father.querySelector("h3");
    toggleScreens();
    editFormInput.value = todoText.innerText;
    lastTodoText = todoText.innerText;
  }

  if (e.target.classList.contains("remove-btn")) {
    father.remove();
  }
});

taskFormSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createTodo(taskFormInput.value);
});

editFormCancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleScreen();
});

editFormSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateTodo(editFormInput.value);
});
