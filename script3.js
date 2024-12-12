document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const filterButtons = {
    all: document.getElementById("filter-all"),
    active: document.getElementById("filter-active"),
    completed: document.getElementById("filter-completed"),
  };

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = (filter = "all") => {
    todoList.innerHTML = "";
    let filteredTodos = todos;

    if (filter === "active") {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === "completed") {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach((todo, index) => {
      const listItem = document.createElement("li");
      listItem.className = todo.completed ? "completed" : "";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos(filter);
      });

      const textSpan = document.createElement("span");
      textSpan.textContent = `${todo.text} (${todo.timestamp})`;
      textSpan.addEventListener("dblclick", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todo.text;

        listItem.replaceChild(editInput, textSpan);
        editInput.focus();

        editInput.addEventListener("blur", () => {
          todo.text = editInput.value;
          saveTodos();
          renderTodos(filter);
        });

        editInput.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            todo.text = editInput.value;
            saveTodos();
            renderTodos(filter);
          }
        });
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "✖";
      deleteButton.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos(filter);
      });

      listItem.appendChild(checkbox);
      listItem.appendChild(textSpan);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    });
  };

  inputField.addEventListener("keydown", e => {
    if (e.key === "Enter" && inputField.value.trim()) {
      const newTodo = {
        text: inputField.value.trim(),
        completed: false,
        timestamp: new Date().toLocaleString(),
      };
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      inputField.value = "";
    }
  });

  Object.keys(filterButtons).forEach(filter => {
    filterButtons[filter].addEventListener("click", () => renderTodos(filter));
  });

  renderTodos();
});
