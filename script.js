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
  if (
    (taskbox.value == undefined && document.querySelector(".errorText")) ||
    (taskbox.value == "" && document.querySelector(".errorText"))
  ) {
    document.querySelector(".errorText").classList.add("highlight");
    setTimeout(() => {
      document.querySelector(".errorText").classList.remove("highlight");
    }, 500);
  } else if (taskbox.value == undefined || taskbox.value == "") {
    const errorText = document.createElement("p");
    errorText.classList.add("errorText");
    errorText.textContent = "Please enter a task in the text box provided";
    tasks.prepend(errorText);
  } else {
    if (document.querySelector(".errorText")) {
      document.querySelector(".errorText").remove();
    }
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container", "pending");
    let taskForm2 = document.createElement("div");
    taskForm2.classList.add("task-form2");
    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("task");
    inputCheckbox.id = `task${count}`;
    let taskLabel = document.createElement("label");
    taskLabel.htmlFor = `task${count}`;
    taskLabel.classList.add("task-label");
    taskLabel.textContent = taskInput;
    taskForm2.append(inputCheckbox, taskLabel);

    let taskButtonsDiv = document.createElement("div");
    taskButtonsDiv.classList.add("task-buttons-div");
    let datetimeSelection = document.createElement("input");
    datetimeSelection.type = "date";
    datetimeSelection.id = "datetimeSelection";
    datetimeSelection.placeholder = "Select Date of Completion";
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("task-buttons", "delete-btn");
    deleteBtn.setAttribute("onclick", "deleteTask(this)");
    deleteBtn.textContent = "Delete Task";
    let editBtn = document.createElement("button");
    editBtn.classList.add("task-buttons", "edit-btn");
    editBtn.setAttribute("onclick", "editTask(this)");
    editBtn.textContent = "Edit Task";
    console.log(editBtn);
    taskButtonsDiv.append(datetimeSelection, deleteBtn, editBtn);

    taskContainer.append(taskForm2, taskButtonsDiv);
    let task = taskContainer;
    count++;
    tasks.append(task);
    document.querySelectorAll(".task-container").forEach((singleTask) => {
      const checkbox = singleTask.querySelector(".task");
      checkbox.addEventListener("change", () => {
        if (checkbox && checkbox.checked) {
          singleTask.classList.add("completed");
          singleTask.classList.remove("pending");
        } else {
          singleTask.classList.remove("completed");
          singleTask.classList.add("pending");
        }
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
  console.dir(deleteItem);
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
