const item = document.getElementById("item");
const todoList = document.getElementById("to-do-box");

item.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addList(this.value);
    this.value = "";
  }
});

function saveList() {
  const data = [];
  const items = todoList.querySelectorAll("li");

  items.forEach((note) => {
    data.push(note.firstChild.textContent.trim()); // Remove the 'x' icon and trim the whitespace
  });

  if (data.length === 0) {
    localStorage.removeItem("item");
  } else {
    localStorage.setItem("item", JSON.stringify(data));
  }
}

const addList = (item) => {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
     ${item}
    <i class="bx bx-x"></i>
  `;

  listItem.addEventListener("click", (event) => {
    event.target.classList.toggle("done");
    saveList();
  });

  const deleteIcon = listItem.querySelector("i");
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the li click event
    listItem.remove();
    saveList();
  });

  todoList.appendChild(listItem);
  saveList();
};

(function () {
  const TodoData = JSON.parse(localStorage.getItem("item"));

  if (TodoData && TodoData.length) {
    TodoData.forEach((todoContent) => {
      addList(todoContent);
    });
  }
})();
