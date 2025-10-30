let textField = document.getElementById("textField");
let addTaskButton = document.getElementById("add_button");
let removeTaskButton = document.getElementById("remove_button");
let taskList = document.getElementById("taskList");

window.addEventListener("load", loadTasks);

addTaskButton.addEventListener('click', addTask);
removeTaskButton.addEventListener('click', removeLastTask);

function addTask() {
    let taskDescription = textField.value.trim();
    if (!taskDescription) return alert("Task can't be empty!");

    let taskDiv = document.createElement("div");
    taskDiv.className = "taskContainer";

    let taskText = document.createElement("span");
    taskText.textContent = taskDescription;


    taskText.addEventListener("click", () => {
        taskText.classList.toggle("done");
        saveTasks();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", () => {
        taskDiv.remove();
        saveTasks();
    });

    taskDiv.append(taskText, deleteBtn);
    taskList.appendChild(taskDiv);

    textField.value = "";
    textField.focus();

    saveTasks();
}

function removeLastTask() {
    let lastTask = taskList.lastElementChild;
    if (lastTask) {
        taskList.removeChild(lastTask);
        saveTasks();
    } else {
        alert("The task list is empty!");
    }
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        taskList.innerHTML = saved;
        restoreEvents();
    }
}

function restoreEvents() {
    document.querySelectorAll(".taskContainer span").forEach(task => {
        task.addEventListener("click", () => {
            task.classList.toggle("done");
            saveTasks();
        });
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.remove();
            saveTasks();
        });
    });
}
