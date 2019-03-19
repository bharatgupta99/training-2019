function TodoItem(_caption, _isCompleted, _id) {
  let caption = _caption;
  let isCompleted = _isCompleted;
  let id = _id;

  this.getCaption = () => {
    return caption;
  };

  this.getIsCompleted = () => {
    return isCompleted;
  };

  this.setCaption = _caption => {
    if (typeof _caption == "string") {
      caption = _caption;
    }
  };

  this.setisCompleted = _isCompleted => {
    if (typeof _isCompleted == "boolean") {
      isCompleted = _isCompleted;
    }
  };

  this.getId = () => {
    return id;
  };
}
