let taskCount = 0;

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const pastTaskList = document.getElementById("past-task-list");
const taskCounter = document.getElementById("task-counter");

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

  addTaskToList(taskText, taskList); 
  taskInput.value = ""; 
  taskCount++; 
  updateTaskCounter();
});

function addTaskToList(taskText, list) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const priorityButton = document.createElement("button");
  priorityButton.className = "priority-circle blue"; 
  priorityButton.addEventListener("click", () => {
    if (priorityButton.classList.contains("blue")) {
      priorityButton.className = "priority-circle yellow";
    } else if (priorityButton.classList.contains("yellow")) {
      priorityButton.className = "priority-circle red";
    } else {
      priorityButton.className = "priority-circle blue";
    }
  });

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  taskContent.className = "task-content";

  taskContent.addEventListener("click", () => {
    taskItem.classList.toggle("completed"); 
  });

  const editButton = document.createElement("button");
  editButton.className = "icon-btn";
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.addEventListener("click", () => {
    const originalText = taskContent.textContent;
    const newTaskText = prompt("Edita la tarea:", taskContent.textContent);
    if (newTaskText !== null) {
      const trimmedText = newTaskText.trim();
      if (trimmedText === "") {
        list.removeChild(taskItem);
        taskCount--;
        updateTaskCounter();
      } else {
        taskContent.textContent = trimmedText;
        const confirmation = confirm("¿Seguro que quieres guardar este cambio?");
        if (!confirmation) {
          taskContent.textContent = originalText; 
        }
      }
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "icon-btn";
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.addEventListener("click", () => {
    const confirmation = confirm("¿Seguro que quieres eliminar esta tarea?");
    if (!confirmation) return;

    deleteTask(taskItem, list);
  });

  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(editButton, deleteButton);

  taskItem.append(priorityButton, taskContent, actions);
  list.appendChild(taskItem);
}

function deleteTask(taskItem, list) {
  list.removeChild(taskItem);
  pastTaskList.appendChild(taskItem); 
  taskItem.classList.add("past"); 
  taskCount--; 
  updateTaskCounter();
}

function updateTaskCounter() {
  const remainingTasks = 10 - taskCount;
  taskCounter.textContent = `Te quedan ${remainingTasks} tareas disponibles para hoy.`;
}
