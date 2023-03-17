domReady(() => {
  
const BACKEND_ROOT_URL = 'http://localhost:3001';
const list = <HTMLUListElement>document.querySelector('#todoList')
const input = <HTMLInputElement>document.querySelector('#newTodo')

input.disabled = true;

fetch(BACKEND_ROOT_URL)
  .then(response => response.json())
  .then((response) => {
    response.forEach(node => {
      renderTask(node.description)
    });
    input.disabled = false;
  }, (error) => {
    alert(error)
  })

input.addEventListener('keypress', event => {
    
    if(event.key === 'Enter') {
        event.preventDefault();
        const text = input.value.trim();
        if(text !== '') {
            // const list_element = document.createElement('li');
            // list_element.setAttribute('class', 'list-group-item');
            // list_element.innerHTML = text;
            // list.append(list_element);
            const json = JSON.stringify({description: text});
            fetch(BACKEND_ROOT_URL+'/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then((response) => {
            renderTask(text);
            input.value = ''
            }, (error) => {
            alert(error)
            })
        }
    }
});
  const renderTask =(text) => {
    const list_element = document.createElement('li');
    list_element.setAttribute('class', 'list-group-item');
    list_element.innerHTML = text;
    list.append(list_element);
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