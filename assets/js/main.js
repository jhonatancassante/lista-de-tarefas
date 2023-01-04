function main() {
    const newTask = document.querySelector('.new-task');
    const taskList = document.querySelector('.task-list');

    function createLi() {
        const li = document.createElement('li');
        return li;
    }

    function createTask(taskText, concluded) {
        const li = createLi();
        li.classList.add(concluded);
        li.innerText = taskText;
        taskList.appendChild(li);
        cleanInput();
        createButtonConcluded(li);
        createButtonDelete(li);
    }

    function cleanInput() {
        newTask.value = '';
        newTask.focus();
    }

    function createButtonConcluded(li) {
        const buttonConcluded = document.createElement('button');
        buttonConcluded.innerHTML = '<i class="fa-solid fa-check" title="Concluído"></i>';
        buttonConcluded.setAttribute('class', 'concluded');
        li.appendChild(buttonConcluded);
    }

    function createButtonDelete(li) {
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = '<i class="fa-solid fa-trash" title="Apagar"></i>';
        buttonDelete.setAttribute('class', 'delete');
        li.appendChild(buttonDelete);
    }

    function saveTasks() {
        const liTasks = taskList.querySelectorAll('li');
        const listOfTasks = [];

        for (let task of liTasks) {
            let taskText = task.innerText;
            let concludedTask = task.classList[0];
            listOfTasks.push({ taskText, concludedTask });
        }

        const tasksJSON = JSON.stringify(listOfTasks);
        localStorage.setItem('tasks', tasksJSON);
    }

    function addSavedTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        const listOfTasks = JSON.parse(tasksJSON);

        if (!listOfTasks) return

        for (let task of listOfTasks) {
            createTask(task.taskText, task.concludedTask);
        }
    }

    function addSavedMode() {
        const darkModeStatus = localStorage.getItem('darkMode');


        if (darkModeStatus === 'active') {
            changeDarkLight();
        }
    }

    function changeDarkLight() {
        const body = document.querySelector('body');
        const iconSun = document.querySelector('.fa-sun');
        const iconMoon = document.querySelector('.fa-moon');

        iconMoon.classList.toggle('active');
        iconSun.classList.toggle('active');
        body.classList.toggle('dark-mode');
    }

    newTask.addEventListener('keypress', (e) => {
        if (e.keyCode !== 13 || !newTask.value) return;
        createTask(newTask.value, 'not-concluded');
        saveTasks();
    });

    document.addEventListener('click', (e) => {
        const el = e.target;

        if (el.classList.contains('add-task')) {
            if (!newTask.value) return;
            createTask(newTask.value, 'not-concluded');
            saveTasks();
        }

        if (el.classList.contains('concluded')) {
            el.parentElement.classList.toggle('concluded');
            el.parentElement.classList.toggle('not-concluded');
            saveTasks();
        }

        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            saveTasks();
        }

        if (el.classList.contains('fa-sun') || el.classList.contains('fa-moon')) {
            changeDarkLight();
            if (el.classList.contains('fa-sun')) localStorage.setItem('darkMode', 'deactive');
            else localStorage.setItem('darkMode', 'active');
        }
    });

    addSavedTasks();
    addSavedMode();
    newTask.focus();
}

main();