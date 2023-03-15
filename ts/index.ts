domReady(() => {
  
const list = <HTMLUListElement>document.querySelector('#todoList')
const input = <HTMLInputElement>document.querySelector('#newTodo')

input.addEventListener('keypress', event => {
    
    if(event.key === 'Enter') {
        event.preventDefault();
        const text = input.value.trim();
        if(text !== '') {
            const list_element = document.createElement('li');
            list_element.setAttribute('class', 'list-group-item');
            list_element.innerHTML = text;
            list.append(list_element);
            input.value = ''
        }
    }
});
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