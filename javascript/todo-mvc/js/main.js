var todoCollection = new TodoCollection();

window.onload = () => {
  document.getElementById("todo-input-form").onsubmit = e => {
    e.preventDefault();

    //Refrences Here
    let todo = document.getElementById("todo-input-box");

    let todoObject = new TodoItem(todo.value);
    todoCollection.addTodo(todoObject);
    render();
    todo.value = "";
  };

  //Button refrences
  let btnAll = document.getElementById("btn-all");
  let btnPending = document.getElementById("btn-pending");
  let btnComplete = document.getElementById("btn-complete");

  btnAll.onclick = () => {
    switchActiveBtn(btnAll, btnPending, btnComplete);
    render();
  };
  btnPending.onclick = () => {
    switchActiveBtn(btnPending, btnAll, btnComplete);
    render("pending");
  };
  btnComplete.onclick = () => {
    switchActiveBtn(btnComplete, btnAll, btnPending);
    render("complete");
  };
};

function createListItem(todoObject) {
  var parent = document.getElementById("todo-list");

  var node = document.createElement("li");
  node.setAttribute("class", "todo-item");

  var todoText = document.createElement("div");
  todoText.className = "todo-text";

  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "todo-check");
  checkbox.setAttribute("id", "todo-check");

  var checkBoxContainer = document.createElement("span");
  checkBoxContainer.setAttribute("class", "checkbox-container");

  var todo = document.createElement("span");
  todo.setAttribute("class", "todo");
  todo.setAttribute("contenteditable", false);
  todo.innerHTML = todoObject.getCaption();

  var todoDelete = document.createElement("span");
  todoDelete.className = "todo-delete";
  todoDelete.innerHTML = "X";

  checkBoxContainer.appendChild(checkbox);
  todoText.appendChild(checkBoxContainer);
  todoText.appendChild(todo);
  node.appendChild(todoText);
  node.appendChild(todoDelete);
  parent.appendChild(node);

  let deleteBtn = node.getElementsByTagName("span")[2];

  node.addEventListener("mouseover", () => {
    deleteBtn.style.display = "initial";
  });

  node.addEventListener("mouseleave", () => {
    deleteBtn.style.display = "none";
  });

  deleteBtn.onclick = () => {
    todoCollection.removeTodo(todoObject.getId());
    render();
  };

  let checkBox = node.getElementsByTagName("input")[0];
  checkBox.addEventListener("change", () => {
    let inputBox = node.getElementsByTagName("span")[1];
    if (inputBox.style.textDecoration == "line-through") {
      inputBox.style.textDecoration = "";
      todoObject.setisCompleted(false);
    } else {
      inputBox.style.textDecoration = "line-through";
      todoObject.setisCompleted(true);
    }
    console.log(todoObject.getIsCompleted());
    node.style.color = "grey";
  });

  return node;
}

function updatePendingCount(c) {
  document.getElementById("todo-count").innerHTML = c + " ";
}

function render(btn) {
  //Removing all the li
  let ul = document.getElementById("todo-list");
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  todos = todoCollection.getTodoCollection();
  for (i = 0; i < todos.length; i++) {
    let todo = todos[i];

    if (btn == "complete") {
      if (todo.getIsCompleted()) {
        let node = createListItem(todo);
        let todoText = node.getElementsByTagName("span")[1];
        let checkBox = node.getElementsByTagName("input")[0];
        checkBox.checked = true;
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "grey";
      }
    } else if (btn == "pending") {
      if (!todo.getIsCompleted()) {
        createListItem(todo);
      }
    } else {
      let node = createListItem(todo);
      if (todo.getIsCompleted()) {
        let todoText = node.getElementsByTagName("span")[1];
        let checkBox = node.getElementsByTagName("input")[0];
        checkBox.checked = true;
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "grey";
      }
    }
  }

  updatePendingCount(todoCollection.getPendingTaks());
}

function switchActiveBtn(btn, btn1, btn2) {
  if (btn.classList.contains("active")) {
    return;
  } else {
    btn.classList.add("active");
    btn1.classList.remove("active");
    btn2.classList.remove("active");
  }
}
