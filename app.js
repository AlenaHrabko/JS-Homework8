let tasks = []; //создаю массив для хранения задач

const nameElement = document.getElementById("taskName"); //нахожу эл-т с названием задачи
const descriptionElement = document.getElementById("taskDescription"); //нахожу эл-т с описанием задачи
const statusElement = document.getElementById("taskStatus"); //нахожу эл-т со статусом задачи

const selectedStatus = document.getElementById("filterStatus").value;
const searchRequest = document.getElementById("searchInput").value;
const filteredTasks = displayTasks(selectedStatus, searchRequest);

function addTask() {
  const name = nameElement.value; //присваиваю переменной name значение имени задачи
  const description = descriptionElement.value; // присваиваю переменной description значение - описание задачи
  const status = statusElement.value; //присваиваю переменной status значение статуса задачи
  const date = new Date().toLocaleString(); //создаю переменную с датой создания задачи
  if (name && description) {
    //проверяю заполнены ли поля имя и описание
    const task = {
      // создаю задачу в виде объекта
      id: tasks.length + 1, // поле id, чтобы можно было удалить конкретную задачу, обратившись к ней по id
      name: name,
      description: description,
      status: status,
      date: date,
    };
    tasks.push(task); // добавляю задачу в массив
    displayTasks(); // отображается добавленная задача
    deleteText(); // Очищаю поля ввода после добавления задачи
  } else {
    alert("Заполните нужные поля!");
  }
}

document.getElementById("addTask").addEventListener("click", addTask); //при клике на кнопку добавить задачу сраб-т ф-я
//  addTask

function displayTasks(filterStatus = "all", searchRequest = "") {
  //у ф-ии два параметра - статус и запрос
  const taskListElement = document.getElementById("taskList"); //обращаюсь к элементу из класса list, где буду
  //хранить       задачи
  taskListElement.innerHTML = ""; // удаляю содержимое из списка перед отображением новых
  //  задач
  const filterClosed = document.getElementById("filterClosed").checked;

  const filteredTasks = tasks.filter((task) => {
    //в filteredTask сохраняю отфильтрованные задачи
    const equalStatus = filterStatus === "all" || task.status === filterStatus; //проверяю соответствует ли статус
    //  задачи заданному в фильтре или "Все", если нужно выбрать все
    const equalSearch = task.name.includes(searchRequest); //проверяю содержит ли имя задачи поисковой запрос
    const closed = task.status === "closed";
    return equalStatus && equalSearch && (!filterClosed || closed); //возвращает задачи если и статус и имя соответствуют запросу
  });

  filteredTasks.forEach((task) => {
    //перебираю все задачи вмассиве, которые соответствуют  запросу
    const taskElement = document.createElement("div"); //создаю div, который будет отображать соответствующую задачу
    taskElement.className = "task"; //объявляю класс - отобразить нужные поля задачи через innerHTML
    taskElement.innerHTML =
      //наполняю содержимым для отображения задачи
      `Название: ${task.name}<br>                    
            Описание: ${task.description}<br>
            Дата создания: ${task.date}<br>
            Статус: ${task.status}<br>
            <button onclick="editTask(${task.id})">Редактировать</button>
            <button onclick="deleteTask(${task.id})">Удалить задачу</button>`;

    //и вызываю ф-ю удаления задачи по параметру id
    taskListElement.appendChild(taskElement); // Добавляю задачу в список
  });
  return filteredTasks;
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id); // с пом.filter создаю новый массив,кот.сохранит те задачи в нем,id
  //  кот-х не равен id задачи,кот.нужно удалить
  displayTasks(); // отображаются все задачи за минусом удаленной
}

let editTaskid = null; // редактируемая задача по id

function editTask(id) {
  const task = tasks.find((task) => task.id === id); //находим в массиве задачу с нужным id
  if (task) {
    editTaskid = id; // сохраняю id редактируемой задачи в нашу переменную
    // автозаполняю поля окна для редактирования
    document.getElementById("editTaskName").value = task.name;
    document.getElementById("editTaskDescription").value = task.description;
    document.getElementById("editTaskStatus").value = task.status;
    // отображаю окно для редактирования
    document.getElementById("popup").style.display = "block";
  }
}

function newDisplay() {
  const selectedStatus = document.getElementById("filterStatus").value;
  const searchRequest = document.getElementById("searchInput").value;
  const filteredTasks = displayTasks(selectedStatus, searchRequest);
  if (filteredTasks.length === 0) {
    console.log("Задачи по Вашему запросу не найдены!");
  }
}

function filterStatus() {
  const selectedStatus = document.getElementById("filterStatus").value;
  const searchRequest = document.getElementById("searchInput").value;
  const filteredTasks = displayTasks(selectedStatus, searchRequest);
  if (filteredTasks.length === 0) {
    console.log("Задачи по Вашему запросу не найдены!");
  }
}

document.getElementById("searchButton").addEventListener("click", newDisplay);
document.getElementById("searchInput").addEventListener("input", newDisplay);
document
  .getElementById("filterStatus")
  .addEventListener("change", filterStatus);
document
  .getElementById("filterClosed")
  .addEventListener("change", filterStatus);

document
  .getElementById("saveEditButton")
  .addEventListener("click", function () {
    const newName = document.getElementById("editTaskName").value;
    const newDescription = document.getElementById("editTaskDescription").value;
    const newStatus = document.getElementById("editTaskStatus").value;
    tasks = tasks.map((task) => {
      if (task.id === editTaskid) {
        return {
          ...task,
          name: newName,
          description: newDescription,
          status: newStatus,
        };
      }
      return task;
    });
    document.getElementById("popup").style.display = "none";
    newDisplay();
  });

document.getElementById("closeButton").onclick = function () {
  document.getElementById("popup").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("popup");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function deleteText() {
  // ф-я для очищения полей ввода после добавления задачи
  document.getElementById("taskName").value = ""; //очищаю поле имя
  document.getElementById("taskDescription").value = ""; //очищаю поле описание
  document.getElementById("taskStatus").selectedIndex = 0; //очищаю выбранный статус (первый элемент)
}
