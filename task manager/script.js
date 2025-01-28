let tasks = [];
let userLoggedIn = false;
let isRegister = false;

document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleAuth();
});

function toggleAuth() {
  isRegister = !isRegister;
  document.getElementById("auth-message").textContent = isRegister ? "Register your account" : "Already have an account? Login!";
  document.getElementById("login-register-btn").textContent = isRegister ? "Register" : "Login";
}

function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    userLoggedIn = true;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("task-section").style.display = "block";
  }
}

function addTask() {
  const taskInput = document.getElementById("task-input").value;
  const dueDate = document.getElementById("due-date").value;

  if (taskInput && dueDate) {
    const task = {
      task: taskInput,
      dueDate: dueDate,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    document.getElementById("task-input").value = "";
    document.getElementById("due-date").value = "";
  }
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <div>
        <p>${task.task}</p>
        <small>Due: ${task.dueDate}</small>
      </div>
      <div>
        <button class="complete" onclick="toggleComplete(${index})">${task.completed ? "Completed" : "Mark as Complete"}</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function viewStats(period) {
  const completedTasks = tasks.filter(task => task.completed);
  const totalTasks = tasks.length;
  const stats = period === 'weekly' ? "Weekly Statistics" : "Monthly Statistics";

  document.getElementById("stats").innerHTML = `
    <h3>${stats}</h3>
    <p>Total tasks: ${totalTasks}</p>
    <p>Completed tasks: ${completedTasks.length}</p>
    <p>Pending tasks: ${totalTasks - completedTasks.length}</p>
  `;
}