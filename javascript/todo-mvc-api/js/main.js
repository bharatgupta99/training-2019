var todoCollection = new TodoCollection();
var activeBtn = "all";

window.onload = () => {
  fetchExistingData();

  document.getElementById("todo-input-form").onsubmit = e => {
    e.preventDefault();

    //Refrences Here
    let todo = document.getElementById("todo-input-box");

    //adding todo to the database
    let data = new FormData();
    data.append("caption", todo.value);
    fetch("http://php.local.geekydev.com/task9/api/AddTodo.php", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        todoCollection.addTodo(
          new TodoItem(data[0]["caption"], false, data[0]["id"])
        );
        render();
      })
      .catch(err => console.log(err));

    todo.value = "";
  };

  //Button refrences
  let btnAll = document.getElementById("btn-all");
  let btnPending = document.getElementById("btn-pending");
  let btnComplete = document.getElementById("btn-complete");

  btnAll.onclick = () => {
    activeBtn = "all";
    switchActiveBtn(btnAll, btnPending, btnComplete);
    render();
  };
  btnPending.onclick = () => {
    activeBtn = "pending";
    switchActiveBtn(btnPending, btnAll, btnComplete);
    render();
  };
  btnComplete.onclick = () => {
    activeBtn = "complete";
    switchActiveBtn(btnComplete, btnAll, btnPending);
    render();
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

  todo.addEventListener("dblclick", () => {
    todo.setAttribute("contenteditable", true);
    todo.focus();
  });

  todo.addEventListener("keydown", e => {
    if (e.keyCode == "13") {
      todo.blur();
    }
  });

  todo.addEventListener("blur", () => {
    let data = new FormData();
    data.append("caption", todo.innerHTML);
    data.append("id", todoObject.getId());
    fetch("http://php.local.geekydev.com/task9/api/UpdateTodo.php", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        todoObject.setCaption(todo.innerHTML);
        render();
      })
      .catch(err => console.log(err));
  });

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
    let data = new FormData();
    data.append("id", todoObject.getId());
    todoCollection.removeTodo(todoObject.getId());
    fetch("http://php.local.geekydev.com/task9/api/RemoveTodo.php", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => console.log(data));
    render();
  };

  let checkBox = node.getElementsByTagName("input")[0];
  checkBox.addEventListener("change", () => {
    let inputBox = node.getElementsByTagName("span")[1];
    if (inputBox.style.textDecoration == "line-through") {
      inputBox.style.textDecoration = "";
      todoObject.setisCompleted(false);

      //Update DB
      let data = new FormData();
      data.append("id", todoObject.getId());
      data.append("isCompleted", 0);
      fetch("http://php.local.geekydev.com/task9/api/CompleteTask.php", {
        method: "POST",
        body: data
      })
        .then(res => res.json())
        .then(data => console.log(data));
    } else {
      inputBox.style.textDecoration = "line-through";
      todoObject.setisCompleted(true);

      //Update DB
      let data = new FormData();
      data.append("id", todoObject.getId());
      data.append("isCompleted", 1);
      fetch("http://php.local.geekydev.com/task9/api/CompleteTask.php", {
        method: "POST",
        body: data
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }
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

    if (activeBtn == "complete") {
      if (todo.getIsCompleted()) {
        let node = createListItem(todo);
        let todoText = node.getElementsByTagName("span")[1];
        let checkBox = node.getElementsByTagName("input")[0];
        checkBox.checked = true;
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "grey";
      }
    } else if (activeBtn == "pending") {
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

function fetchExistingData() {
  fetch("http://php.local.geekydev.com/task9/api/FetchTodos.php")
    .then(res => res.json())
    .then(data => {
      for (var i in data) {
        let todoObject = new TodoItem(
          data[i]["caption"],
          data[i]["isCompleted"] == 0 ? false : true,
          data[i]["id"]
        );
        todoCollection.addTodo(todoObject);
      }
      render();
    })
    .catch(function(error) {
      console.log(error);
    });
}
