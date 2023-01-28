class ToDoList {
  constructor() {
    // Retrieve the tasks from local storage or create an empty array if none exist
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Get the container element for the list and create a new list if it doesn't exist
    this.listContainer = document.getElementById('list-container');
    this.list = this.listContainer.querySelector('ul') || document.createElement('ul');
    this.listContainer.appendChild(this.list);
    // Populate the list with the current tasks
    this.populateList();
  }

  // Adds a new task to the list with the given description
  addTask(description) {
    const task = {
      description, // The task description
      completed: false, // Initially, the task is not completed
      index: this.tasks.length + 1, // Assign a unique index to the task
    };
    this.tasks.push(task);
    // Update the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // Re-populate the list to reflect the new task
    this.populateList();
  }

  // Removes a task from the list at the given index
  removeTask(index) {
    this.tasks.splice(index, 1);
    // Update the indices of the remaining tasks
    for (let i = index; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    // Update the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // Re-populate the list to reflect the removed task
    this.populateList();
  }

  // Removes all tasks that have been marked as completed
  removeCompletedTasks() {
    // Get all list items
    const listItems = this.list.querySelectorAll('li');
    // Store the indices of completed tasks
    const completedTasks = [];
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        // Remove the completed task from the list
        listItems[i].remove();
      }
    }
    // Remove the completed tasks from the tasks array
    this.tasks = this.tasks.filter(
      (task, index) => !completedTasks.includes(index),
    );
    // Update the indices of the remaining tasks
    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    // Update the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // Re-populate the list to reflect the removed tasks
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

export default ToDoList;
