import {Todos} from "./class/todos.js";
import {Task} from "./class/task.js";

domReady(() => {
const BACKEND_ROOT_URL = 'http://localhost:3001';

const todos = new Todos(BACKEND_ROOT_URL);

const list = <HTMLUListElement>document.querySelector('#todoList')
const input = <HTMLInputElement>document.querySelector('#newTodo')

input.disabled = true;

todos.getTasks().then((tasks:Array<Task>) => {
  tasks.forEach((task) => {
    renderTask(task);
    });
    input.disabled = false;
  }).catch (error => {
    alert(error)
  })

input.addEventListener('keypress', event => {
    
    if(event.key === 'Enter') {
        // event.preventDefault();
        const text = input.value.trim();
        if(text !== '') {
            
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
              renderTask(<Task>task);
            })
        }
        event.preventDefault();
    }
});
  const renderTask =(task : Task) => {
    const list_element = document.createElement('li');
    list_element.setAttribute('class', 'list-group-item');
    list_element.setAttribute('data-key', task.id.toString());
    // list_element.innerHTML = task.text;
    renderSpan(list_element, task.text);
    renderLink(list_element, task.id);
    list.append(list_element);
  }
  const renderSpan = (list_element: HTMLLIElement, text: string) => {
    const span = list_element.appendChild(document.createElement('span'));
    span.innerHTML = text;
  }
  const renderLink = (list_element: HTMLLIElement, id:number) => {
    const link = list_element.appendChild(document.createElement('a'));
    link.innerHTML = '<i class = "bi bi-trash-fill"></i>';
    link.setAttribute('style', 'float: right');
    link.addEventListener('click', (event) => {
      todos.removeTask(id).then((id) => {
        const elementToremove: HTMLLIElement = document.querySelector(`[data-key="${id}"]`);
        if(elementToremove) {
          list.removeChild(elementToremove);
        }
      }).catch(error => {
        alert(error);
  })
})
  }
  
});

function domReady(cb: Function): void {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      cb();
  
    } else {
      document.addEventListener("DOMContentLoaded", (event: Event) => {
        cb();
      });
    }
  }