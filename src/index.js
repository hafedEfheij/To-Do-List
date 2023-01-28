class ToDoList {
  constructor() {
    // Get the tasks from local storage or create an empty array
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.listContainer = document.getElementById('list-container');
    this.list = this.listContainer.querySelector('ul') || document.createElement('ul');
    this.listContainer.appendChild(this.list);
    this.populateTaskList();
  }

  // Function to add a new task
  addNewTask(description) {
    const task = {
      description,
      completed: false,
      index: this.tasks.length,
    };
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateTaskList();
  }

  // Function to remove completed tasks
  removeCompletedTasks() {
    const listItems = this.list.querySelectorAll('li');
    const completedTasks = [];
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }

    // remove completed tasks from the tasks array
    this.tasks = this.tasks.filter((task, index) => !completedTasks.includes(index));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateTaskList();
  }

  // Function to populate the task list
  populateTaskList() {
    this.list.innerHTML = '';
    for (let i = 0; i < this.tasks.length; i += 1) {
      const task = this.tasks[i];
      const listItem = document.createElement('li');
      listItem.innerHTML = `<input type="checkbox" class="checkbox"></input>${task.description}`;
      this.list.addEventListener('change', (event) => {
        if (event.target.className === 'checkbox') {
          task.completed = event.target.checked;
        }
      });
      this.list.appendChild(listItem);
    }
  }
}

const toDoList = new ToDoList();

document.addEventListener('keyup', (event) => {
  const inputField = document.getElementById('input-field');
  if (event.code === 'Enter' && document.activeElement === inputField) {
    toDoList.addNewTask(inputField.value);
    toDoList.populateTaskList();
    inputField.value = '';
  }
});

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
  toDoList.removeCompletedTasks();
});
