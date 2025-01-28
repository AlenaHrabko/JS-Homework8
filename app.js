let tasks = []; //создаю массив для хранения задач

function addTask() {
  const nameElement = document.getElementById("taskName"); //нахожу эл-т с названием задачи
  const descriptionElement = document.getElementById("taskDescription"); //нахожу эл-т с описанием задачи
  const statusElement = document.getElementById("taskStatus"); //нахожу эл-т со статусом задачи

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

  const filteredTasks = tasks.filter((task) => {
    //в filteredTask сохраняю отфильтрованные задачи
    const equalStatus = filterStatus === "all" || task.status === filterStatus; //проверяю соответствует ли статус
    //  задачи заданному в фильтре или "Все", если нужно выбрать все
    const equalSearch = task.name.includes(searchRequest); //проверяю содержит ли имя задачи поисковой запрос
    return equalStatus && equalSearch; //возвращает задачи если и статус и имя соответствуют запросу
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
            <button onclick="deleteTask(${task.id})">Удалить задачу</button>`; // добавляю кнопку удаления задачи по id
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

function deleteText() {
  // ф-я для очищения полей ввода после добавления задачи
  document.getElementById("taskName").value = ""; //очищаю поле имя
  document.getElementById("taskDescription").value = ""; //очищаю поле описание
  document.getElementById("taskStatus").selectedIndex = 0; //очищаю выбранный статус (первый элемент)
}

//при нажатии на кнопку поиск отображаются задачи согласно заполненным полям
document.getElementById("searchButton").addEventListener("click", function () {
  const selectedStatus = document.getElementById("filterStatus").value;
  const searchRequest = document.getElementById("searchInput").value;
  const filteredTasks = displayTasks(selectedStatus, searchRequest);
  if (filteredTasks.length === 0) {
    alert("Задачи по Вашему запросу не найдены!");
  }
});
