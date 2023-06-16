// Retrieve tasks from local storage
function getTasks() {
    let tasks = [];
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }
  
  // Save tasks to local storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Add a new task
  function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
  }
  
  // Remove a task
  function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
  }
  
  // Update task completion
  function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
  }
  
  // Update task name
  function updateTaskName(index, newName) {
    const tasks = getTasks();
    tasks[index].name = newName;
    saveTasks(tasks);
  }
  
  // Render tasks on the page
  function renderTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  
    const tasks = getTasks();
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        toggleTask(index);
        renderTasks();
      });
  
      const taskText = document.createElement('span');
      taskText.textContent = task.name;
      taskText.addEventListener('click', () => {
        toggleTask(index);
        renderTasks();
      });
      if (task.completed) {
        taskText.classList.add('completed');
      }
  
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        const newName = prompt('Enter a new name for the task:', task.name);
        if (newName !== null && newName.trim() !== '') {
          updateTaskName(index, newName.trim());
          renderTasks();
        }
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        removeTask(index);
        renderTasks();
      });
  
      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(updateButton);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    });
  }
  
  // Handle form submission
  const form = document.getElementById('todo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const taskName = input.value.trim();
    if (taskName !== '') {
      const task = {
        name: taskName,
        completed: false
      };
      addTask(task);
      input.value = '';
      renderTasks();
    }
  });
  
  // Initial rendering of tasks
  renderTasks();
  