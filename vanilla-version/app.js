console.log("app.js loaded");

const input = document.querySelector("#todo-input");
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const filters = document.querySelector("#filters");

let todos = [];
let nextId = 1;
let currentFilter = "all";
let editingId = null;

// Load todos from localStorage on page load
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

function renderTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  todoList.innerHTML = "";

  filters.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.done;
    if (currentFilter === "completed") return todo.done;
    return true; // show all
  });

  visibleTodos.forEach((todo) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "x";

    li.appendChild(checkbox);

    if (todo.id === editingId) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      li.appendChild(editInput);

      const commit = () => {
        const newText = editInput.value.trim();
        if (newText) todo.text = newText;
        editingId = null;
        renderTodos();
      };
      const cancel = () => {
        editingId = null;
        renderTodos();
      };
      editInput.addEventListener("blur", commit);
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commit();
        else if (e.key === "Escape") cancel();
      });
    } else {
      const span = document.createElement("span");
      span.textContent = todo.text;
      li.appendChild(span);

      span.addEventListener("dblclick", () => {
        editingId = todo.id;
        renderTodos();
      });
    }

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    todo.done && li.classList.add("done");

    if (todo.id === editingId) {
      const editInput = li.querySelector("input[type='text']");
      editInput.focus();
      editInput.select();
    }

    deleteBtn.addEventListener("click", () => {
      console.log("delete button clicked", todos);
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      console.log("from checkbox change:", todos);
      renderTodos();
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  todos.push({ id: nextId++, text: input.value, done: false });
  input.value = "";
  renderTodos();

  console.log("from handleSubmit:", todos);
});

filters.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return; 
  console.log("filter clicked", event.target.dataset.filter);
  const filter = event.target.dataset.filter;
  currentFilter = filter;
  renderTodos();
});

renderTodos();
