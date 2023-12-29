// app.js
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Check if the input is empty
    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function () {
        toggleTask(this);
    };

    // Create a span with the task text
    const span = document.createElement('span');
    span.innerText = taskInput.value;

    // Create a button to remove the task
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.onclick = function () {
        removeTask(this);
    };

    // Append elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const taskItem = button.parentNode;
    taskList.removeChild(taskItem);
}

function toggleTask(checkbox) {
    const taskItem = checkbox.parentNode;
    const taskText = taskItem.querySelector('span');

    if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
    } else {
        taskText.style.textDecoration = 'none';
    }
}
const taskInput = document.getElementById('taskInput')
taskInput.addEventListener('keypress', function(Event){
    if (Event.key== 'Enter') {
        addTask();
    }
})