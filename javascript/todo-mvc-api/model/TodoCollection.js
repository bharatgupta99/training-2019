function TodoCollection() {
  let todoCollection = [];
  let pendingTasks = 0;
  this.getTodoCollection = () => {
    return todoCollection;
  };
  this.addTodo = item => {
    todoCollection.push(item);
    pendingTasks++;
  };
  this.getPendingTaks = () => {
    return pendingTasks;
  };

  this.removeTodo = id => {
    for (i = 0; i < todoCollection.length; i++) {
      if (todoCollection[i].getId() == id) {
        todoCollection.splice(i, 1);
      }
    }
    pendingTasks--;
  };
}
