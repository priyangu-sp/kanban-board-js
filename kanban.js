let dragged = null;

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    dragged = e.currentTarget;
}

function drop(e) {
    e.preventDefault();

    const list = e.target.closest('.column').querySelector('.tasks');
    
    if (dragged && list) {
        list.appendChild(dragged);
        saveTask();
    }
}

const inputBox = document.querySelector(".task");

inputBox.onkeydown = function(e) {
    if (e.key === "Enter" && inputBox.value.trim() !== "") {
        addNewTask(inputBox.value, "todo");
        inputBox.value = "";
    }
};

function addNewTask(text, columnName) {
    const task = document.createElement("div");
    task.className = "taskbar";
    task.draggable = true;
    task.ondragstart = drag;

    task.innerHTML = "<span>" + text + "</span><button>✕</button>";

    task.querySelector("button").onclick = function() {
        task.remove();
    };

    const columnList = document.querySelector("." + columnName + " .tasks");
    columnList.appendChild(task);
}

function saveTask() {
    let taskList = [];
    
    document.querySelectorAll(".taskbar").forEach(function(item) {
        let parentColumn = item.closest(".column");
        let status = parentColumn.classList[0];
        taskList.push({ title: item.querySelector("span").textContent, status: status });
    });

    localStorage.setItem("kanbanBoard", JSON.stringify(taskList));
}

window.onload = function() {
    let data = JSON.parse(localStorage.getItem("kanbanBoard"));
    if (data) {
        data.forEach(function(t) {
            addNewTask(t.title, t.status);
        });
    }
};