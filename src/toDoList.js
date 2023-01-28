// This class creates a ToDoList object that allows users to add, remove, and view tasks.
export default class ToDoList {
constructor() {
// Get the tasks from local storage or create an empty array if none exist.
this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Get the container element for the list and the list element itself.
this.listContainer = document.getElementById('list-container');
this.list = this.listContainer.querySelector('ul') || document.createElement('ul');
// Append the list element to the container.
this.listContainer.appendChild(this.list);
// Populate the list with the existing tasks.
this.populateList();
}

  addTask(description) {
    const task = {
      description,
      completed: false,
      index: this.tasks.length + 1,
    };
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateList();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    for (let i = index; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateList();
  }

  editTask(index, newDescription) {
    if (index < this.tasks.length) {
      this.tasks[index].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.populateList();
    }
  }

  populateList() {
    this.list.innerHTML = '';
    for (let i = 1; i <= this.tasks.length; i += 1) {
      const task = this.tasks[i - 1];
      const listItem = document.createElement('li');
      listItem.innerHTML = `<input type="checkbox" class="checkbox"></input><p class="description">${task.description}</p><i class="fa-regular fa-trash-can"></i>`;
      listItem.addEventListener('click', (event) => {
        if (event.target.className === 'description') {
          const inputField = document.createElement('input');
          inputField.value = task.description;
          inputField.addEventListener('keyup', (event) => {
            if (event.code === 'Enter') {
              this.editTask(i - 1, inputField.value);
              listItem.innerHTML = `<input type="checkbox" class="checkbox"></input><p class="description">${task.description}</p><i class="fa-regular fa-trash-can"></i>`;
            }
          });
          listItem.innerHTML = '';
          listItem.appendChild(inputField);
          inputField.focus();
        }
      });
      listItem.querySelector('.fa-trash-can').addEventListener('click', () => {
        this.removeTask(i - 1);
      });
      this.list.addEventListener('change', (event) => {
        if (event.target.className === 'checkbox') {
          task.completed = event.target.checked;
        }
      });
      this.list.appendChild(listItem);
    }
  }
}