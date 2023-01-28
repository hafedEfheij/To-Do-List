export default class RemoveCheckbox {
  constructor(toDoList) {
    this.toDoList = toDoList;
  }

  removeCompletedTasks() {
    // Select all list items and create an array to store completed tasks
    const listItems = document.querySelectorAll('li');
    const completedTasks = [];

    // Iterate through list items and check if checkbox is checked
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }

    // Filter the task array, remove  update the task index and store in local storage
    this.toDoList.tasks = this.toDoList.tasks.filter(
      (task, index) => !completedTasks.includes(index),
    );
    for (let i = 0; i < this.toDoList.tasks.length; i += 1) {
      this.toDoList.tasks[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(this.toDoList.tasks));
    this.toDoList.populateList();
  }
}
