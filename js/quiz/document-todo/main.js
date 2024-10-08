const container = document.getElementById('container');
const input = document.createElement('input');
input.type = 'text';
container.appendChild(input);

const button = document.createElement('button');
const buttonText = document.createTextNode('추가');
button.appendChild(buttonText);
container.appendChild(button);

const todoList = document.getElementById('todoList');

button.addEventListener('click', function () {
    const todoText = input.value; 
    if (todoText === '') return; 
    
    const newTodo = document.createElement('li');
    const todoContent = document.createTextNode(todoText);
    
    newTodo.appendChild(todoContent);

    newTodo.addEventListener('click', function () {
        todoList.removeChild(newTodo);
    });

    newTodo.addEventListener('mouseover', function () {
        todoList.style.cursor = 'pointer'
    });

    todoList.insertBefore(newTodo, todoList.firstChild);

    input.value = '';
});
