const itemNameInput = document.querySelector("#item-name-input");
const addItemButton = document.querySelector("#add-item-button");
const listContainer = document.querySelector("#list-container");
const itemNameInputError = document.querySelector("#item-name-input-error");
const finishedListContainer = document.querySelector(
  "#finished-list-container"
);

const items = [];
const finishedItems = [];
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

function addItem(itemName) {
  items.push(itemName);
  updateList();
}

function updateList() {
  listContainer.replaceChildren();
  finishedListContainer.replaceChildren();

  if (items.length === 0 && finishedItems.length === 0) {
    const listEmptyMessage = document.createElement("p");
    listEmptyMessage.textContent = "To-Do List is empty...";
    listContainer.appendChild(listEmptyMessage);

    return;
  }

  for (let index = items.length - 1; index >= 0; index--) {
    const value = items[index];

    const listItemContainer = document.createElement("article");
    const checkButton = document.createElement("button");
    checkButton.textContent = "\u{2713}";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "\u{2715}";
    const itemValue = document.createElement("span");

    listItemContainer.appendChild(checkButton);
    listItemContainer.appendChild(deleteButton);
    listItemContainer.appendChild(itemValue);
    listItemContainer.classList.add("list-item");
    listContainer.appendChild(listItemContainer);

    checkButton.addEventListener("click", () => {
      finishedItems.push(items.splice(index, 1));
      itemNameInput.focus();
      updateList();
    });
    deleteButton.addEventListener("click", () => {
      items.splice(index, 1);
      itemNameInput.focus();
      updateList();
    });
    itemValue.textContent = value;
  }

  for (let index = finishedItems.length - 1; index >= 0; index--) {
    const value = finishedItems[index];

    const listItemContainer = document.createElement("article");
    const undoButton = document.createElement("button");
    undoButton.textContent = "\u{21B6}";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "\u{2715}";
    const itemValue = document.createElement("span");
    itemValue.style.textDecoration = "line-through";

    listItemContainer.appendChild(undoButton);
    listItemContainer.appendChild(deleteButton);
    listItemContainer.appendChild(itemValue);
    listItemContainer.classList.add("list-item");
    finishedListContainer.appendChild(listItemContainer);

    undoButton.addEventListener("click", () => {
      items.push(finishedItems.splice(index, 1));
      itemNameInput.focus();
      updateList();
    });
    deleteButton.addEventListener("click", () => {
      finishedItems.splice(index, 1);
      itemNameInput.focus();
      updateList();
    });
    itemValue.textContent = value;
  }
}
