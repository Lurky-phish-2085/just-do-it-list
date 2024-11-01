class TaskRepository {
  static instance() {
    return JSON.parse(localStorage.getItem("tasks"));
  }

  static update(db) {
    if (!(db instanceof Array)) {
      throw new Error("TaskRepository: supplied db is not an array.");
    }

    localStorage.setItem("tasks", JSON.stringify(db));
  }
}

class Task {
  constructor(description, done) {
    this.description = description;
    this.done = done;
  }

  static findAll() {
    return TaskRepository.instance();
  }

  static findById(id) {
    const db = TaskRepository.instance();

    return db.filter((task) => task.id === id).at(0);
  }

  static update(id, newTask) {
    const db = TaskRepository.instance();
    let taskUpdate = this.findById(id);
    taskUpdate = { id: id, ...newTask };
    const oldTask = db.splice(this.#findIndexOf(id), 1, taskUpdate);
    TaskRepository.update(db);

    return oldTask;
  }

  static delete(id) {
    const db = TaskRepository.instance();
    const oldTask = db.splice(this.#findIndexOf(id), 1);
    TaskRepository.update(db);

    return oldTask;
  }

  static size() {
    return TaskRepository.instance().length;
  }

  static isEmpty() {
    return TaskRepository.instance().length === 0;
  }

  save() {
    const db = TaskRepository.instance();
    const newTask = JSON.parse(JSON.stringify(this));
    newTask.id = Task.isEmpty() ? 1 : db.at(-1).id + 1;
    db.push(newTask);

    TaskRepository.update(db);
  }

  static #findIndexOf(id) {
    const db = TaskRepository.instance();
    let elementIndex = null;

    db.forEach((task, index) => {
      if (task.id === id) {
        elementIndex = index;
      }
    });

    return elementIndex;
  }
}

const itemNameInput = document.querySelector("#item-name-input");
const addItemButton = document.querySelector("#add-item-button");
const listContainer = document.querySelector("#list-container");
const itemNameInputError = document.querySelector("#item-name-input-error");
const finishedListContainer = document.querySelector(
  "#finished-list-container"
);

init();

function init() {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  updateList();

  const addListItem = () => {
    if (itemNameInput.value === "") {
      itemNameInputError.classList.remove("hidden");
      return;
    }

    itemNameInputError.classList.add("hidden");
    addItem(itemNameInput.value);
    itemNameInput.value = "";
    setTimeout(() => itemNameInput.focus(), 80); // prevents the itemNameInput from firing any event.
  };

  addItemButton.addEventListener("click", addListItem);
  itemNameInput.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    addListItem();
  });
}

function addItem(itemName) {
  const task = new Task(itemName, false);
  task.save();
  updateList();
}

function updateList() {
  listContainer.replaceChildren();
  finishedListContainer.replaceChildren();

  if (Task.isEmpty()) {
    const listEmptyMessage = document.createElement("p");
    listEmptyMessage.textContent = "To-Do List is empty...";
    listContainer.appendChild(listEmptyMessage);

    return;
  }

  const CHECK_ICON = "\u{2713}";
  const DELETE_ICON = "\u{2715}";
  const UNDO_ICON = "\u{21B6}";
  const EDIT_ICON = "\u{270E}";

  const items = Task.findAll();
  for (let index = items.length - 1; index >= 0; index--) {
    const item = items[index];

    const listItemContainer = document.createElement("article");
    const actionButton = document.createElement("button");
    actionButton.textContent = item.done ? UNDO_ICON : CHECK_ICON;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = DELETE_ICON;
    const editButton = document.createElement("button");
    editButton.textContent = EDIT_ICON;
    const itemValue = document.createElement("span");

    listItemContainer.appendChild(actionButton);
    listItemContainer.appendChild(deleteButton);
    listItemContainer.appendChild(editButton);
    listItemContainer.appendChild(itemValue);
    listItemContainer.classList.add("list-item");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = item.description;

    if (item.done) {
      itemValue.style.textDecoration = "line-through";
      finishedListContainer.append(listItemContainer);
      listItemContainer.removeChild(editButton);
    } else {
      listContainer.appendChild(listItemContainer);
    }

    const applyEdit = () => {
      Task.update(item.id, { ...item, description: editInput.value });
      updateList();
    };
    const enableEditMode = () => {
      itemValue.classList.add("hidden");
      listItemContainer.insertBefore(editInput, itemValue);
      editButton.textContent = CHECK_ICON;
      actionButton.disabled = true;
      deleteButton.disabled = true;
      setTimeout(() => editInput.focus(), 80);

      editButton.onclick = applyEdit;
      editInput.onkeyup = (e) => {
        if (e.key === "Enter") applyEdit();
      };
    };

    editButton.onclick = enableEditMode;

    itemValue.textContent = item.description;
    actionButton.addEventListener("click", () => {
      Task.update(item.id, { ...item, done: !item.done });
      updateList();
    });
    deleteButton.addEventListener("click", () => {
      Task.delete(item.id);
      updateList();
    });
  }
}
