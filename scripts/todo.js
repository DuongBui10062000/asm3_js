"use strict";

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const taskList = document.getElementById("todo-list");

const arrTask = getDataFromStorage("arrTask");

const createNewTask = function () {
  if (inputTask.value.trim() === "") {
    alert("Vui lòng nhập thông tin công việc!");
    return;
  }
  const task = inputTask.value;
  return new Task(task, state.currentUser, false);
};

const generateTaskMarkup = function (taskData) {
  return `
    <li class="li-element ${taskData.isDone ? "checked" : ""}" data-task='${
    taskData.task
  }'>${taskData.task}<span class="close">×</span></li>
  `;
};

const showTaskList = function () {
  taskList.innerHTML = "";
  arrTask.forEach((task) => {
    render(generateTaskMarkup(task), "tasklist");
  });
};

const clear = function () {
  inputTask.value = "";
};

btnAdd.addEventListener("click", function () {
  const taskInfor = createNewTask();

  // convert task instance to JS object for save to storage
  const saveTask = {
    task: taskInfor.getTask(),
    owner: taskInfor.getOwner().getName(),
    isDone: taskInfor.getIsDone(),
  };

  for (const task of arrTask) {
    if (saveTask.task === task.task) {
      alert("Hmm! Tên của task phải là duy nhất! Xin lỗi vì sự bất tiện này!");
      clear();
      return;
    }
  }

  arrTask.push(saveTask);

  saveToStorage("arrTask", arrTask);

  showTaskList();

  clear();
});

taskList.addEventListener("click", function (e) {
  // lay index cua task hien tai
  const currentIndex = arrTask.findIndex((el) => {
    const { task } = e.target.closest(".li-element").dataset;
    if (task === el.task) return el;
  });

  if (e.target.classList.contains("li-element")) {
    // doi trang thai khi click checked
    e.target.classList.toggle("checked");

    e.target.classList.contains("checked")
      ? (arrTask[currentIndex].isDone = true)
      : (arrTask[currentIndex].isDone = false);

    saveToStorage("arrTask", arrTask);
    return;
  }

  if (e.target.classList.contains("close")) {
    // del element
    arrTask.splice(currentIndex, 1);

    saveToStorage("arrTask", arrTask);

    showTaskList();
    return;
  }
});

// show content when user redirected to todo page
showTaskList();
