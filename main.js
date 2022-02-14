const addTaskBtn = document.getElementById("add-task-btn");
const descTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");
const deleteBtn = document.querySelector("#btn-delete")

let tasks;
(!localStorage.tasks) ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function fillHTMLList(){
  todosWrapper.innerHTML = "";
  if(tasks.length > 0){
    filterTasks();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index);
    })
    todoItemElems = document.querySelectorAll('.todo-item');
  }
}

fillHTMLList();

function Task(description){
  this.description = description;
  this.completed = false;
}

function createTemplate (task, index){
  return `
  <div class="todo-item ${task.completed ? "checked" : ""}">
    <div class="description">
      ${task.description}
    </div>
    <div class="buttons">
      <input onclick = "completeTask(${index})"type="checkbox" id="btn-complete" ${task.completed ? "checked" : ""}>
      <button onclick = "deleteTask(${index})" id = "btn-delete">Удалить</button>
    </div>
  </div>
  `;
}

function updateLocal(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function completeTask(index){
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed){
    todoItemElems[index].classList.add("checked");
  }
  else{
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHTMLList();
}

function filterTasks(){
  let activeTasks = tasks.length && tasks.filter(item => item.completed == false)
  let completedTasks = tasks.length && tasks.filter(item => item.completed == true)
  tasks = [...activeTasks, ...completedTasks];
}

function deleteTask(index){
  todoItemElems[index].classList.add("delition")
  setTimeout(()=>{
    tasks.splice(index, 1);
    updateLocal();
    fillHTMLList();
  }, 1000)
}


addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(descTaskInput.value))
  updateLocal();
  fillHTMLList();
  descTaskInput.value = "";
})

