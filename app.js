// Selección de elementos
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

// Cargar tareas desde el LocalStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Evento para añadir tarea
addTaskButton.addEventListener('click', addTask);

// Función para añadir tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Guardar tarea en LocalStorage
    saveTaskToLocalStorage(taskText);

    taskInput.value = ''; // Limpiar input
}

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="btn btn-success btn-sm me-2 complete-task">✔</button>
            <button class="btn btn-danger btn-sm delete-task">✖</button>
        </div>
    `;

    // Eventos de los botones
    li.querySelector('.complete-task').addEventListener('click', completeTask);
    li.querySelector('.delete-task').addEventListener('click', deleteTask);

    return li;
}

// Marcar tarea como completada
function completeTask(e) {
    const li = e.target.parentElement.parentElement;
    li.querySelector('span').classList.toggle('completed');
}

// Eliminar tarea
function deleteTask(e) {
    const li = e.target.parentElement.parentElement;
    taskList.removeChild(li);
    removeTaskFromLocalStorage(li.querySelector('span').textContent);
}

// Guardar tarea en LocalStorage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde LocalStorage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Obtener tareas desde LocalStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Eliminar tarea de LocalStorage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
