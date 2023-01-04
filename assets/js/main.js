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
        buttonConcluded.innerText = 'Concluído';
        buttonConcluded.setAttribute('class', 'concluded');
        li.appendChild(buttonConcluded);
    }

    function createButtonDelete(li) {
        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Apagar';
        buttonDelete.setAttribute('class', 'delete');
        li.appendChild(buttonDelete);
    }

    function saveTasks() {
        const liTasks = taskList.querySelectorAll('li');
        const listOfTasks = [];

        for (let task of liTasks) {
            let taskText = task.innerText;
            let concludedTask = task.classList[0];
            taskText = taskText.replace('Concluído', '');
            taskText = taskText.replace('Apagar', '').trim();
            listOfTasks.push({ taskText, concludedTask });
        }

        const tasksJSON = JSON.stringify(listOfTasks);
        localStorage.setItem('tasks', tasksJSON);
    }

    function addSavedTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        const listOfTasks = JSON.parse(tasksJSON);

        for (let task of listOfTasks) {
            createTask(task.taskText, task.concludedTask);
        }
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
    });

    addSavedTasks();
    newTask.focus();
}

main();