window.onload = function() {
  var count = 0;
  var btnAll = document.getElementById("btn-all");
  var btnPending = document.getElementById("btn-pending");
  var btnComplete = document.getElementById("btn-complete");

  //Adding new todo and attaching various event listeners to each todo.
  document.getElementById("todo-input-form").onsubmit = e => {
    count++;
    e.preventDefault();

    var node = createListItem(e.target[1].value);
    e.target[1].value = "";

    //Check so that if completed list is active than do not show new items added
    if (btnComplete.classList.contains("active")) {
      node.style.display = "none";
    }

    var deleteTodoBtn = node.getElementsByClassName("todo-delete")[0];
    node.addEventListener("mouseover", () => {
      deleteTodoBtn.style.display = "initial";
    });
    node.addEventListener("mouseleave", () => {
      deleteTodoBtn.style.display = "none";
    });
    deleteTodoBtn.addEventListener("click", () => {
      node.remove();
      count--;
      updateCount(count);
    });

    var checkbox = node.getElementsByTagName("input")[0];
    checkbox.addEventListener("change", () => {
      if (btnPending.classList.contains("active")) {
        node.style.display = "none";
      }
      if (node.style.textDecoration == "line-through") {
        node.style.textDecoration = "none";
        count++;
        updateCount(count);
      } else {
        node.style.textDecoration = "line-through";
        count--;
        updateCount(count);
      }
      node.style.color = "grey";
    });

    var todo = node.getElementsByTagName("span")[1];
    todo.addEventListener("dblclick", () => {
      todo.setAttribute("contenteditable", true);
      todo.focus();
    });

    todo.addEventListener("focusout", () => {
      //if user left todo empty after editing
      if (todo.innerHTML == "") {
        node.remove();
        count--;
        updateCount(count);
      }
      todo.setAttribute("contenteditable", false);
    });

    todo.addEventListener("keydown", e => {
      if (e.keyCode == 13) {
        todo.blur();
      }
    });

    updateCount(count);
  };

  //"Active", "All", "Complete" section are handled
  btnAll.onclick = () => {
    var todos = document.getElementById("todo-list").getElementsByTagName("li");
    for (i = 0; i < todos.length; i++) {
      todos[i].style.display = "flex";
    }
    setActive(btnAll, btnPending, btnComplete);
  };

  btnPending.onclick = () => {
    var todos = document.getElementById("todo-list").getElementsByTagName("li");
    for (i = 0; i < todos.length; i++) {
      if (todos[i].style.textDecoration == "line-through") {
        todos[i].style.display = "none";
      } else {
        todos[i].style.display = "flex";
      }
    }
    setActive(btnPending, btnAll, btnComplete);
  };

  btnComplete.onclick = () => {
    var todos = document.getElementById("todo-list").getElementsByTagName("li");
    for (i = 0; i < todos.length; i++) {
      if (todos[i].style.textDecoration != "line-through") {
        todos[i].style.display = "none";
      } else {
        todos[i].style.display = "flex";
      }
    }
    setActive(btnComplete, btnAll, btnPending);
  };
};

//This function is creating and appending new items to the list
function createListItem(val) {
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
  todo.innerHTML = val;

  var todoDelete = document.createElement("span");
  todoDelete.className = "todo-delete";
  //   todoDelete.id = "todo-delete";
  todoDelete.innerHTML = "X";

  checkBoxContainer.appendChild(checkbox);
  todoText.appendChild(checkBoxContainer);
  todoText.appendChild(todo);
  node.appendChild(todoText);
  node.appendChild(todoDelete);
  parent.appendChild(node);

  return node;
}

//Switching "Active", "All", "Completed" button styling
function setActive(main, element1, element2) {
  if (main.classList.contains("active")) {
    return;
  } else {
    main.classList.add("active");
    element1.classList.remove("active");
    element2.classList.remove("active");
  }
}

//Updating count when some task is completed or new task is added
function updateCount(count) {
  document.getElementById("todo-count").innerHTML = count + " ";
}
