const taskbox = document.getElementById("task-box");
let taskInput;
taskbox.addEventListener("change", () => {
  taskInput = taskbox.value;
  // console.log(taskInput);
});
const categoryButtons = document.querySelectorAll(".category-buttons");
console.log(categoryButtons);
const tasks = document.getElementById("tasks");
let count = 0;
document.querySelector(".task-form-inner").addEventListener("submit", (e) => {
  e.preventDefault();
  if (taskbox.value == undefined || taskbox.value == "") {
    const errorText = document.createElement("p");
    errorText.classList.add("errorText");
    errorText.textContent = "Please enter a task in the text box provided";
    tasks.prepend(errorText);
  } else {
    if (document.querySelector(".errorText")) {
      document.querySelector(".errorText").remove();
    }
    let task = `<div class="task-container pending">
          <div class="task-form2">
            <input type="checkbox" class="task" id="task${count}" /><label class="task-label" for="task${count}"
              >${taskInput}</label
            >
          </div>
          <div class="task-buttons">
            <input
              type="date"
              id="datetimeSelection"
              placeholder="Select Date of Completion"
            />
            <button class="task-buttons delete-btn" onclick="deleteTask(this)">Delete Task</button>
            <button class="task-buttons edit-btn" onclick="editTask(this)">Edit Task</button>
          </div>
        </div>`;
    count++;
    tasks.innerHTML += task;
    document.querySelectorAll(".task").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        document.querySelectorAll(".task-container").forEach((singleTask) => {
          const checkbox = singleTask.querySelector(".task");
          if (checkbox && checkbox.checked) {
            singleTask.classList.add("completed");
            singleTask.classList.remove("pending");
          } else {
            singleTask.classList.remove("completed");
            singleTask.classList.add("pending");
          }
        });
      });
    });
    taskbox.value = "";
  }
});

function displayAllTasks() {
  const allTasks = document.querySelectorAll(".task-container");
  allTasks.forEach((task) => {
    task.classList.remove("hidden");
  });
}

function displayCompletedTasks() {
  const allTasks = document.querySelectorAll(".task-container");
  allTasks.forEach((singleTask) => {
    if (!singleTask.classList.contains("completed")) {
      singleTask.classList.add("hidden");
    } else {
      singleTask.classList.remove("hidden");
    }
  });
}

function displayPendingTasks() {
  const allTasks = document.querySelectorAll(".task-container");
  allTasks.forEach((singleTask) => {
    if (!singleTask.classList.contains("pending")) {
      singleTask.classList.add("hidden");
    } else {
      singleTask.classList.remove("hidden");
    }
  });
}

function addSelectedClass(button) {
  categoryButtons.forEach((categoryButton) => {
    categoryButton.classList.remove("selected");
  });
  button.classList.add("selected");
}

function deleteTask(deleteItem) {
  deleteItem.parentElement.parentElement.remove();
}
function editTask(editItem) {
  const taskDiv = editItem.parentElement.parentElement.firstElementChild;
  const taskLabel = taskDiv.querySelector(".task-label");
  if (editItem.textContent === "Edit Task") {
    const currentLabel = taskLabel.textContent;
    const inputEditor = document.createElement("input");
    inputEditor.type = "text";
    inputEditor.value = currentLabel;
    inputEditor.classList.add("input-editor");
    taskDiv.replaceChild(inputEditor, taskLabel);
    editItem.textContent = "Save";
  } else {
    const inputEditor = taskDiv.querySelector(".input-editor");
    const updatedLabel = inputEditor.value;
    const newLabelElement = document.createElement("label");
    newLabelElement.classList.add("task-label");
    newLabelElement.htmlFor = `task${count}`;
    newLabelElement.textContent = updatedLabel;
    taskDiv.replaceChild(newLabelElement, inputEditor);
    editItem.textContent = "Edit Task";
    editItem.parentElement.parentElement.firstElementChild.firstElementChild.id = `task${count}`;
  }
}
