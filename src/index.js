// Import the ToDoList class from the toDoList.js file
import ToDoList from './toDoList.js';

// Create a new instance of the ToDoList class
const toDoList = new ToDoList();

// Add an event listener to the document that listens for a keyup event
document.addEventListener('keyup', (event) => {
// Get a reference to the input field
const inputField = document.getElementById('input-field');

// Check if the event code is 'Enter' and if the active element is the input field
if (event.code === 'Enter' && document.activeElement === inputField) {
// Add the task from the input field to the ToDoList
toDoList.addTask(inputField.value);
// Populate the list on the page with the updated tasks
toDoList.populateList();
// Clear the input field
inputField.value = '';
}
});

// Get a reference to the clear button
const clearButton = document.getElementById('clear-button');

// Add an event listener to the clear button that listens for a click event
clearButton.addEventListener('click', () => {
// Call the removeCompletedTasks method on the ToDoList instance to remove all completed tasks
toDoList.removeCompletedTasks();
});