var idCount = 0;

function TodoItem(_caption) {
  let caption = _caption;
  let isCompleted = false;
  let id = idCount;

  idCount++;

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
