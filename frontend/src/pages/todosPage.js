// export const todosPage = () => {
//   const container = document.createElement("div");

//   container.classList.add(
//     "flex",
//     "flex-col",
//     "items-center",
//     "justify-center",
//     "h-screen",
//     "bg-gray-200"
//   );

//   const btnHome = document.createElement("button");

//   btnHome.classList.add(
//     "bg-blue-500",
//     "text-white",
//     "p-2",
//     "rounded",
//     "hover:bg-blue-600",
//     "mb-4"
//   );

//   btnHome.textContent = "Home";

//   btnHome.addEventListener("click", () => {
//     window.location.pathname = "/home";
//   });

//   const title = document.createElement("h1");

//   title.classList.add("text-3xl", "font-bold", "mb-4");
//   title.textContent = "List of Todos";

//   const table = document.createElement("table");

//   table.classList.add(
//     "w-1/2",
//     "bg-white",
//     "shadow-md",
//     "h-[700px]",
//     "overflow-y-scroll"
//   );

//   const thead = document.createElement("thead");
//   const tr = document.createElement("tr");
//   const th1 = document.createElement("th");
//   th1.classList.add("border", "px-4", "py-2");
//   th1.textContent = "ID";

//   const th2 = document.createElement("th");
//   th2.classList.add("border", "px-4", "py-2");
//   th2.textContent = "Title";

//   const th3 = document.createElement("th");
//   th3.classList.add("border", "px-4", "py-2");
//   th3.textContent = "Completed";

//   const th4 = document.createElement("th");
//   th4.classList.add("border", "px-4", "py-2");
//   th4.textContent = "Owner Id";

//   tr.appendChild(th1);
//   tr.appendChild(th2);
//   tr.appendChild(th3);
//   tr.appendChild(th4);

//   thead.appendChild(tr);

//   const tbody = document.createElement("tbody");

//   tbody.classList.add("text-center");
//   table.appendChild(thead);
//   table.appendChild(tbody);

//   container.appendChild(btnHome);
//   fetch("http://localhost:4000/todos", {
//     method: "GET",
//     credentials: "include",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       data.todos.forEach((todo) => {
//         if (todo.id > 10) return;

//         const tr = document.createElement("tr");

//         const td1 = document.createElement("td");
//         td1.classList.add("border", "px-4", "py-2");
//         td1.textContent = todo.id;

//         const td2 = document.createElement("td");
//         td2.classList.add("border", "px-4", "py-2");
//         td2.textContent = todo.title;

//         const td3 = document.createElement("td");
//         td3.classList.add("border", "px-4", "py-2");
//         td3.textContent = todo.completed ? "Sí" : "No";

//         const td4 = document.createElement("td");
//         td4.classList.add("border", "px-4", "py-2");
//         td4.textContent = todo.owner;

//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tr.appendChild(td3);
//         tr.appendChild(td4);
//         tbody.appendChild(tr);
//       });
//     });

//   container.appendChild(title);
//   container.appendChild(table);

//   return container;
// };

const createButton = (text, classes, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...classes);
  button.addEventListener("click", onClick);
  return button;
};

const createTableHeader = () => {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const headers = ["ID", "Título", "Completado", "ID del Propietario", "Acciones"];

  headers.forEach(header => {
    const th = document.createElement("th");
    th.classList.add("border", "px-4", "py-2");
    th.textContent = header;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  return thead;
};

const createEditForm = (todo, onSave) => {
  const editForm = document.createElement("div");
  editForm.classList.add("fixed", "top-1/4", "left-1/4", "p-4", "bg-white", "shadow-md");

  const titleInput = document.createElement("input");
  titleInput.value = todo.title;
  titleInput.classList.add("border", "p-2", "mb-2");

  const completedInput = document.createElement("input");
  completedInput.type = "checkbox";
  completedInput.checked = todo.completed;
  completedInput.classList.add("mr-2");

  const saveButton = createButton("Guardar", ["bg-green-500", "text-white", "p-2", "rounded", "hover:bg-green-600"], () => {
    const updatedTodo = {
      title: titleInput.value,
      completed: completedInput.checked,
    };
    onSave(updatedTodo);
    document.body.removeChild(editForm); // Remove the form after saving
  });

  editForm.appendChild(titleInput);
  editForm.appendChild(completedInput);
  editForm.appendChild(saveButton);
  return editForm;
};

const createNewTaskForm = (onSave) => {
  const newTaskForm = document.createElement("div");
  newTaskForm.classList.add("fixed", "top-1/4", "left-1/4", "p-4", "bg-white", "shadow-md");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Título de la tarea";
  titleInput.classList.add("border", "p-2", "mb-2");

  const completedInput = document.createElement("input");
  completedInput.type = "checkbox";
  completedInput.classList.add("mr-2");

  const saveButton = createButton("Guardar", ["bg-green-500", "text-white", "p-2", "rounded", "hover:bg-green-600"], () => {
    const newTask = {
      title: titleInput.value,
      completed: completedInput.checked,
    };
    onSave(newTask);
  });

  const cancelButton = createButton("Cancelar", ["bg-gray-500", "text-white", "p-2", "rounded", "hover:bg-gray-600"], () => {
    document.body.removeChild(newTaskForm); // Remove the form without saving
  });

  newTaskForm.appendChild(titleInput);
  newTaskForm.appendChild(completedInput);
  newTaskForm.appendChild(saveButton);
  newTaskForm.appendChild(cancelButton);

  return newTaskForm;
};

const updateTable = (todos, tbody) => {
  tbody.innerHTML = ""; // Clear the existing rows
  todos.forEach(todo => {
    if (todo.id > 10) return;

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.classList.add("border", "px-4", "py-2");
    td1.textContent = todo.id;

    const td2 = document.createElement("td");
    td2.classList.add("border", "px-4", "py-2");
    td2.textContent = todo.title;

    const td3 = document.createElement("td");
    td3.classList.add("border", "px-4", "py-2");
    td3.textContent = todo.completed ? "Sí" : "No";

    const td4 = document.createElement("td");
    td4.classList.add("border", "px-4", "py-2");
    td4.textContent = todo.owner;

    const td5 = document.createElement("td");
    td5.classList.add("border", "px-4", "py-2");

    const btnEdit = createButton("Editar", ["bg-yellow-500", "text-white", "p-1", "rounded", "mr-2", "hover:bg-yellow-600"], () => {
      const editForm = createEditForm(todo, (updatedTodo) => {
        fetch(`http://localhost:4000/todos/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
          credentials: "include",
        })
          .then(response => {
            if (!response.ok) throw new Error('Error updating task');
            return response.json();
          })
          .then(() => {
            alert("Tarea actualizada");
            fetchTodos(); // Refresh the table after updating
          })
          .catch(error => alert(`Error: ${error.message}`));
      });
      document.body.appendChild(editForm);
    });

    const btnDelete = createButton("Eliminar", ["bg-red-500", "text-white", "p-1", "rounded", "hover:bg-red-600"], () => {
      if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
        fetch(`http://localhost:4000/todos`, {
          method: "DELETE",
          credentials: "include",
        })
          .then(response => {
            if (!response.ok) throw new Error('Error deleting task');
            return response.json();
          })
          .then(() => {
            alert("Tarea eliminada");
            fetchTodos(); // Refresh the table after deleting
          })
          .catch(error => alert(`Error: ${error.message}`));
      }
    });

    td5.appendChild(btnEdit);
    td5.appendChild(btnDelete);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
};

const fetchTodos = () => {
  fetch("http://localhost:4000/todos", {
    method: "GET",
    credentials: "include",
  })
    .then(response => {
      if (!response.ok) throw new Error('Error fetching tasks');
      return response.json();
    })
    .then(data => updateTable(data.todos, document.querySelector("tbody")))
    .catch(error => alert(`Error: ${error.message}`));
};

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "items-center", "justify-center", "h-screen", "bg-gray-200");

  const btnHome = createButton("Inicio", ["bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600", "mb-4"], () => {
    window.location.pathname = "/home";
  });

  const btnNewTask = createButton("Nueva Tarea", ["bg-teal-500", "text-white", "p-2", "rounded", "hover:bg-teal-600", "mb-4"], () => {
    const newTaskForm = createNewTaskForm((newTask) => {
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
        credentials: "include",
      })
        .then(response => {
          if (!response.ok) throw new Error('Error creating task');
          return response.json();
        })
        .then(() => {
          alert("Tarea creada");
          fetchTodos(); // Refresh the table after creating
          document.body.removeChild(newTaskForm); // Remove the form after saving
        })
        .catch(error => alert(`Error: ${error.message}`));
    });
    document.body.appendChild(newTaskForm);
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "Lista de Tareas";

  const table = document.createElement("table");
  table.classList.add("w-1/2", "bg-white", "shadow-md", "h-[700px]", "overflow-y-scroll");

  const thead = createTableHeader();
  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnNewTask); // Add the new task button
  container.appendChild(title);
  container.appendChild(table);

  fetchTodos(); // Initial load of tasks

  return container;
};
