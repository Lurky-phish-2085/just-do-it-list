const itemNameInput = document.querySelector("#item-name-input");
const addItemButton = document.querySelector("#add-item-button");
const listContainer = document.querySelector("#list-container");

const items = [];
updateList();

const addListItem = () => {
  addItem(itemNameInput.value);
  itemNameInput.value = "";
  itemNameInput.focus();
};
itemNameInput.addEventListener("keyup", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  addListItem();
});
addItemButton.addEventListener("click", () => {
  addListItem();
});

function addItem(itemName) {
  items.push(itemName);
  updateList();
}

function updateList() {
  listContainer.replaceChildren();

  if (items.length === 0) {
    const listEmptyMessage = document.createElement("p");
    listEmptyMessage.textContent = "To-Do List is empty...";
    listContainer.appendChild(listEmptyMessage);

    return;
  }

  for (let index = 0; index < items.length; index++) {
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
    listContainer.appendChild(listItemContainer);

    checkButton.addEventListener("click", () => {
      items.splice(index, 1);
      updateList();
    });
    deleteButton.addEventListener("click", () => {
      items.splice(index, 1);
      updateList();
    });
    itemValue.textContent = `${index}: ${value}`;
  }
}
