$(document).ready(function() {
  fetchTodoAndUpdateUI(null);

  $("#add-todo").submit(function(event) {
    event.preventDefault();
    addTodo(this);
  });

  $(document).on("keypress", function(e) {
    if (e.which == 13) {
      var caps = document.getElementsByClassName("caption");
      for (i = 0; i < caps.length; i++) {
        if (caps[i].getAttribute("contenteditable")) {
          caps[i].blur();
        }
      }
    }
  });
});

function createLiNode(todo) {
  var node = document.createElement("li");
  node.id = "caption-btns-" + todo["id"];
  node.className = "d-flex justify-content-between mt-2";

  var d1 = document.createElement("div");
  d1.id = "caption-" + todo["id"];
  d1.className = "caption";
  d1.onfocusout = function() {
    saveTodo(todo["id"]);
  };

  var d2 = document.createElement("div");

  var removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger mr-1";
  removeBtn.onclick = function() {
    remove(todo["id"]);
  };
  removeBtn.innerHTML = "Remove";

  var editBtn = document.createElement("button");
  editBtn.className = "btn btn-info mr-1";

  editBtn.id = "editBtn-" + todo["id"];
  editBtn.innerHTML = "Edit";
  editBtn.onclick = function() {
    edit(todo["id"]);
  };

  var strikeBtn = document.createElement("button");
  strikeBtn.className = "btn btn-warning mr-1";
  strikeBtn.onclick = function() {
    done(todo["id"]);
  };
  strikeBtn.id = "strikeBtn-" + todo["id"];
  strikeBtn.innerHTML = "Strike";

  if (todo["isCompleted"] != 0) {
    d1.innerHTML = "<strike>" + todo["caption"] + "</strike>";
    editBtn.disabled = true;
    strikeBtn.disabled = true;
  } else {
    d1.innerHTML = todo["caption"];
  }

  d2.appendChild(removeBtn);
  d2.appendChild(editBtn);
  d2.appendChild(strikeBtn);

  node.appendChild(d1);
  node.appendChild(d2);

  return node;
}

function fetchTodoAndUpdateUI(id) {
  var result = null;
  $.ajax({
    url: "http://php.local.geekydev.com/task9/api/FetchTodos.php",
    type: "GET",
    data: {
      id: id
    },
    success: function(res) {
      res = JSON.parse(res);
      for (i = 0; i < res.length; i++) {
        let node = createLiNode(res[i]);
        var todos = document.getElementById("todos");
        todos.appendChild(node);
      }
    }
  });
}

function addTodo(form) {
  var $form = $(form);

  var $inputs = $form.find("input, button");

  var serializeData = $form.serialize();

  $inputs.prop("disabled", true);

  $.ajax({
    url: "http://php.local.geekydev.com/task9/api/AddTodo.php",
    type: "POST",
    data: serializeData,
    success: function(response, textStatus, jqXHR) {
      response = JSON.parse(response);
      var node = createLiNode(response[0]);
      var todos = document.getElementById("todos");
      todos.appendChild(node);
      console.log("Todo added successfully!");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error adding todo :- " + textStatus);
    },
    complete: function() {
      $inputs.prop("disabled", false);
      $inputs[0].value = "";
    }
  });
}

function remove(id) {
  document.getElementById("caption-btns-" + id).remove();
  $.ajax({
    url: "http://php.local.geekydev.com/task9/api/RemoveTodo.php",
    type: "POST",
    data: {
      id: id
    },
    success: function(response, textStatus, jqXHR) {
      console.log("Success! Remove");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
}

function done(id) {
  $.ajax({
    url: "http://php.local.geekydev.com/task9/api/CompleteTask.php",
    type: "POST",
    data: {
      id: id
    },
    success: function(response, textStatus, jqXHR) {
      console.log("Success! Update");
      let text = document.getElementById("caption-" + id);
      text.innerHTML = "<strike>" + text.innerHTML + "</strike>";
      document.getElementById("editBtn-" + id).disabled = true;
      document.getElementById("strikeBtn-" + id).disabled = true;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
}

function edit(id) {
  let cap = document.getElementById("caption-" + id);
  cap.setAttribute("contenteditable", true);
  cap.focus();
}

function saveTodo(id) {
  let cap = document.getElementById("caption-" + id);
  $.ajax({
    url: "http://php.local.geekydev.com/task9/api/UpdateTodo.php",
    type: "POST",
    data: {
      id: id,
      caption: cap.innerHTML
    },
    success(response, textStatus, jqXHR) {
      console.log(textStatus);
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
    complete() {
      cap.setAttribute("contenteditable", false);
    }
  });
}
