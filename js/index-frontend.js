import { Todos } from "./class/todos.js";
domReady(() => {
    const BACKEND_ROOT_URL = 'http://localhost:3001';
    const todos = new Todos(BACKEND_ROOT_URL);
    const list = document.querySelector('#todoList');
    const input = document.querySelector('#newTodo');
    input.disabled = true;
    todos.getTasks().then((tasks) => {
        tasks.forEach((task) => {
            renderTask(task);
        });
        input.disabled = false;
    }).catch(error => {
        alert(error);
    });
    input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            // event.preventDefault();
            const text = input.value.trim();
            if (text !== '') {
                // const json = JSON.stringify({description: text});
                // fetch(BACKEND_ROOT_URL+'/new', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: json
                // })
                // .then(response => response.json())
                // .then((response) => {
                // renderTask(text);
                // input.value = ''
                // }, (error) => {
                // alert(error)
                // })
                todos.addTask(text).then((task) => {
                    input.value = '';
                    input.focus();
                    renderTask(task);
                });
            }
            event.preventDefault();
        }
    });
    const renderTask = (task) => {
        const list_element = document.createElement('li');
        list_element.setAttribute('class', 'list-group-item');
        list_element.innerHTML = task.text;
        list.append(list_element);
    };
});
function domReady(cb) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        cb();
    }
    else {
        document.addEventListener("DOMContentLoaded", (event) => {
            cb();
        });
    }
}
