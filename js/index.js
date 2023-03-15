domReady(() => {
    const list = document.querySelector('#todoList');
    const input = document.querySelector('#newTodo');
    input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const text = input.value.trim();
            if (text !== '') {
                const list_element = document.createElement('li');
                list_element.setAttribute('class', 'list-group-item');
                list_element.innerHTML = text;
                list.append(list_element);
                input.value = '';
            }
        }
    });
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
