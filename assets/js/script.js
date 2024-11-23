let taskCount = 0; // Contador de tareas

// Selección de elementos principales
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const pastTaskList = document.getElementById("past-task-list");
const taskCounter = document.getElementById("task-counter");

// Evento para agregar una nueva tarea
addTaskBtn.addEventListener("click", () => {
  if (taskCount >= 10) {
    alert("Has alcanzado el límite de 10 tareas por día.");
    return;
  }

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  addTaskToList(taskText, taskList); // Añade la tarea a la lista "Tareas del Día"
  taskInput.value = ""; // Limpia el campo de entrada
  taskCount++; // Incrementa el contador de tareas
  updateTaskCounter();
});

// Función para crear una tarea y añadirla a una lista específica
function addTaskToList(taskText, list) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  // Botón de prioridad como un círculo
  const priorityButton = document.createElement("button");
  priorityButton.className = "priority-circle blue"; // Prioridad por defecto: baja
  priorityButton.addEventListener("click", () => {
    if (priorityButton.classList.contains("blue")) {
      priorityButton.className = "priority-circle yellow";
    } else if (priorityButton.classList.contains("yellow")) {
      priorityButton.className = "priority-circle red";
    } else {
      priorityButton.className = "priority-circle blue";
    }
  });

  // Texto de la tarea
  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  taskContent.className = "task-content";

  // Evento para marcar como completada
  taskContent.addEventListener("click", () => {
    taskItem.classList.toggle("completed"); // Alterna entre completada y no completada
  });

  // Botón de editar
  const editButton = document.createElement("button");
  editButton.className = "icon-btn";
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.addEventListener("click", () => {
    const originalText = taskContent.textContent; // Guarda el texto original
    const newTaskText = prompt("Edita la tarea:", taskContent.textContent);
    if (newTaskText !== null) {
      const trimmedText = newTaskText.trim();
      if (trimmedText === "") {
        list.removeChild(taskItem); // Elimina la tarea directamente
        taskCount--; // Reduce el contador de tareas
        updateTaskCounter();
      } else {
        taskContent.textContent = trimmedText;
        const confirmation = confirm("¿Seguro que quieres guardar este cambio?");
        if (!confirmation) {
          taskContent.textContent = originalText; // Revertir al texto original si no se confirma
        }
      }
    }
  });

  // Botón de eliminar
  const deleteButton = document.createElement("button");
  deleteButton.className = "icon-btn";
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.addEventListener("click", () => {
    const confirmation = confirm("¿Seguro que quieres eliminar esta tarea?");
    if (!confirmation) return;

    deleteTask(taskItem, list);
  });

  // Ensamblar los elementos
  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(editButton, deleteButton);

  taskItem.append(priorityButton, taskContent, actions);
  list.appendChild(taskItem);
}

// Función para eliminar una tarea
function deleteTask(taskItem, list) {
  list.removeChild(taskItem); // Elimina de la lista actual
  pastTaskList.appendChild(taskItem); // Mueve a tareas pasadas
  taskItem.classList.add("past"); // Desactiva edición y prioridades
  taskCount--; // Reduce el contador
  updateTaskCounter();
}

// Función para actualizar el contador de tareas
function updateTaskCounter() {
  const remainingTasks = 10 - taskCount;
  taskCounter.textContent = `Te quedan ${remainingTasks} tareas disponibles para hoy.`;
}
